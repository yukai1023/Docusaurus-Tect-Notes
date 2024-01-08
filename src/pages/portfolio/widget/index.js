import Layout from '@theme/Layout';
import PortfolioWidget from '@site/src/components/PortfolioWidget';
import PortfolioHeader from '@site/src/components/PortfolioHeader';

export default function Portfolio() {
  return (
    <Layout>
      <PortfolioHeader />
      <main>
        <PortfolioWidget />
      </main>
    </Layout>
  );
}
