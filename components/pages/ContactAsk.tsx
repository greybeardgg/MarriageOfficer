'use client';

import { useRouter } from 'next/navigation';
import { AskBox } from '@/components/front-door/AskBox';

/** The box that answers, on the Contact page: its way on is question one. */
export function ContactAsk() {
  const router = useRouter();
  return <AskBox onStart={() => router.push('/?start')} />;
}
