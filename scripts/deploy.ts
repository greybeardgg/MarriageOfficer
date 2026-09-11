/**
 * Publish the built site to the Prisma Compute sandbox.
 *
 *   bun run build
 *   PRISMA_SERVICE_TOKEN=… bun run deploy              # dry run
 *   PRISMA_SERVICE_TOKEN=… bun run deploy -- --publish # publish
 *
 * PRISMA_APP_ID and PRISMA_SERVICE_TOKEN can also be provided once via a
 * `.deploy.env` file in the repo root (KEY=value per line); the environment
 * always wins over the file. `bun run publish` builds and publishes in one
 * command.
 *
 * Ported from rlesport/scripts/deploy.ts. Three things this does that look odd
 * are load-bearing: `.next/static` and `public/` are copied into the standalone
 * bundle by hand (Next leaves both out, expecting a CDN; without them the site
 * has no CSS and no images), and the bundle is staged with
 * stageStandaloneArtifact because the archiver refuses symlinks that escape the
 * archive root.
 */
import { cp, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { ComputeClient, PreBuilt, stageStandaloneArtifact } from '@prisma/compute-sdk';
import { createManagementApiClient } from '@prisma/management-api-sdk';

const API_BASE = 'https://api.prisma.io';
const STANDALONE = '.next/standalone';
const STAGED = '.next/deploy-artifact';

function loadDeployEnvFile(): void {
  const path = '.deploy.env';
  if (!existsSync(path)) return;
  const contents = readFileSync(path, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    if (!key) continue;
    if (process.env[key] === undefined) process.env[key] = value;
  }
  console.log('loaded .deploy.env');
}

async function main(): Promise<void> {
  loadDeployEnvFile();
  const APP_ID = process.env['PRISMA_APP_ID'] ?? '';
  const token = process.env['PRISMA_SERVICE_TOKEN'];
  if (!token) { console.error('PRISMA_SERVICE_TOKEN is not set.'); process.exit(1); }
  if (!APP_ID.startsWith('cps_')) { console.error('PRISMA_APP_ID is not set (the cps_… id from the console).'); process.exit(1); }
  if (!(await Bun.file(`${STANDALONE}/server.js`).exists())) {
    console.error(`No ${STANDALONE}/server.js — run \`bun run build\` first.`); process.exit(1);
  }
  const publish = process.argv.includes('--publish');
  console.log(`app ${APP_ID}`);
  if (!publish) { console.log('DRY RUN — nothing uploaded. Add --publish to go live.'); return; }

  // Next's standalone output leaves out BOTH .next/static and public/ (it
  // expects a CDN to serve them). Nothing here has a CDN, so both are copied
  // in by hand. Missing public/ was found the only way it can be found: the
  // published site 404'd its own logo (2026-09-11).
  console.log('copying .next/static and public into the bundle');
  await rm(`${STANDALONE}/.next/static`, { recursive: true, force: true });
  await cp('.next/static', `${STANDALONE}/.next/static`, { recursive: true });
  await rm(`${STANDALONE}/public`, { recursive: true, force: true });
  await cp('public', `${STANDALONE}/public`, { recursive: true });

  console.log(`staging ${STANDALONE} -> ${STAGED}`);
  await rm(STAGED, { recursive: true, force: true });
  await stageStandaloneArtifact({ standaloneDir: STANDALONE, artifactDir: STAGED, appPath: process.cwd() });

  const client = new ComputeClient(createManagementApiClient({ baseUrl: API_BASE, token }));
  const result = await client.deploy({
    appId: APP_ID,
    strategy: new PreBuilt({ appPath: STAGED, entrypoint: 'server.js' }),
    progress: {
      onArchiveReady: (bytes) => console.log(`  archive   ${(bytes / 1e6).toFixed(1)} MB`),
      onDeploymentCreated: (id) => console.log(`  created   ${id}`),
      onUploadStart: () => console.log('  uploading…'),
      onUploadComplete: () => console.log('  uploaded'),
      onStatusChange: (status) => console.log(`  status    ${status}`),
      onRunning: (url) => console.log(`  running   ${url}`),
      onPromoted: (domain) => console.log(`  PROMOTED  ${domain}`),
    },
  });
  if (result.isErr()) { console.error('DEPLOY FAILED'); console.error(result.error); process.exit(1); }
  console.log('Published.');
}

await main();
