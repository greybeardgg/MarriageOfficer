'use client';

import { useRouter } from 'next/navigation';
import { AskBox } from '@/components/front-door/AskBox';
import { useStartQuiz } from '@/components/front-door/InPageQuiz';

/** The box that answers, on the Contact page: its way on is question one, started here. */
export function ContactAsk() {
  const router = useRouter();
  const start = useStartQuiz();
  return <AskBox onStart={start ?? (() => router.push('/?start'))} />;
}
