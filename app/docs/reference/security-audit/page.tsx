import { DocsArticle } from '../../_components/DocsArticle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Audit',
  description: 'PayDeck security audit information.',
};

export default function Page() {
  return (
    <DocsArticle>
      <h1>Security Audit</h1>
      <p>Documentation for this section is coming soon.</p>
    </DocsArticle>
  );
}
