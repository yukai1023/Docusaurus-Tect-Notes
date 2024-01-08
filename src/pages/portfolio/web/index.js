import Layout from '@theme/Layout';
import PortfolioWeb from '@site/src/components/PortfolioWeb';
import PortfolioHeader from '@site/src/components/PortfolioHeader';

export default function Portfolio() {
  return (
    <Layout>
      <PortfolioHeader />
      <main>
        <PortfolioWeb />
      </main>
    </Layout>
  );
}
