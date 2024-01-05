import clsx from 'clsx';
import Layout from '@theme/Layout';
import PortfolioFeatures from '@site/src/components/PortfolioFeatures';

import Heading from '@theme/Heading';
import styles from './portfolio.module.css';

function PortfolioHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.hero__title)}>
          ✨&nbsp;Portfolio&nbsp;✨
        </Heading>
      </div>
    </header>
  );
}

export default function Portfolio() {
  return (
    <Layout>
      <PortfolioHeader />
      <main>
        <PortfolioFeatures />
      </main>
    </Layout>
  );
}
