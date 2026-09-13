import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { FrontDoor } from '@/components/front-door/FrontDoor';

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  // `/?start` opens straight onto question one, for links from elsewhere on the site.
  const autostart = sp.start !== undefined;
  return (
    <>
      <Guilloche />
      <Chrome />
      <main>
        <FrontDoor autostart={autostart} />
      </main>
    </>
  );
}
