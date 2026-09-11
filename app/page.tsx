import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { FrontDoor } from '@/components/front-door/FrontDoor';

export default function Home() {
  return (
    <>
      <Guilloche />
      <Chrome />
      <main>
        <FrontDoor />
      </main>
    </>
  );
}
