/**
 * Publish the built site to the Prisma Compute sandbox.
 *
 *   bun run build
 *   PRISMA_SERVICE_TOKEN=… bun run deploy              # dry run
 *   PRISMA_SERVICE_TOKEN=… bun run deploy -- --publish # publish
 *
 * Ported from rlesport/scripts/deploy.ts. Two things this does that look odd
 * are load-bearing: `.next/static` is copied into the standalone bundle by
 * hand (Next leaves it out, expecting a CDN; without it the site has no CSS),
 * and the bundle is staged with stageStandaloneArtifact because the archiver
 * refuses symlinks that escape the archive root.
 */
import { cp, rm } from 'node:fs/promises';
import { ComputeClient, PreBuilt, stageStandaloneArtifact } from '@prisma/compute-sdk';
import { createManagementApiClient } from '@prisma/management-api-sdk';

const APP_ID = process.env['PRISMA_APP_ID'] ?? '';
const API_BASE = 'https://api.prisma.io';
const STANDALONE = '.next/standalone';
const STAGED = '.next/deploy-artifact';

async function main(): Promise<void> {
  const token = process.env['PRISMA_SERVICE_TOKEN'];
  if (!token) { console.error('PRISMA_SERVICE_TOKEN is not set.'); process.exit(1); }
  if (!APP_ID.startsWith('cps_')) { console.error('PRISMA_APP_ID is not set (the cps_… id from the console).'); process.exit(1); }
  if (!(await Bun.file(`${STANDALONE}/server.js`).exists())) {
    console.error(`No ${STANDALONE}/server.js — run \`bun run build\` first.`); process.exit(1);
  }
  const publish = process.argv.includes('--publish');
  console.log(`app ${APP_ID}`);
  if (!publish) { console.log('DRY RUN — nothing uploaded. Add --publish to go live.'); return; }

  console.log('copying .next/static into the bundle');
  await rm(`${STANDALONE}/.next/static`, { recursive: true, force: true });
  await cp('.next/static', `${STANDALONE}/.next/static`, { recursive: true });

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
