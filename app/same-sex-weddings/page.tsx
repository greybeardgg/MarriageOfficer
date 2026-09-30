import type { Metadata } from 'next';
import { SAME_SEX } from '@/src/site/pages';
import { ContentPageView } from '@/components/pages/ContentPageView';

export const metadata: Metadata = SAME_SEX.meta;

export default function SameSexWeddings() {
  return <ContentPageView page={SAME_SEX} />;
}
