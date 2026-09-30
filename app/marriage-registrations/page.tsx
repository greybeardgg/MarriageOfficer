import type { Metadata } from 'next';
import { REGISTRATION } from '@/src/site/pages';
import { ContentPageView } from '@/components/pages/ContentPageView';

export const metadata: Metadata = REGISTRATION.meta;

export default function MarriageRegistration() {
  return <ContentPageView page={REGISTRATION} />;
}
