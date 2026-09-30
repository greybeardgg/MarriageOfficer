import type { Metadata } from 'next';
import { CEREMONIES } from '@/src/site/pages';
import { ContentPageView } from '@/components/pages/ContentPageView';

export const metadata: Metadata = CEREMONIES.meta;

export default function WeddingCeremonies() {
  return <ContentPageView page={CEREMONIES} />;
}
