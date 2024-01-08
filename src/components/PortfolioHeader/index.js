import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const ButtonGroup = () => {
  const location = useLocation();
  const group = ['Web', 'Widget']

  return (
    <div className={styles.buttonGroup}>
      {group.map((path) => (
        <Link to={`/portfolio/${path.toLowerCase()}`}>
          <button className={location.pathname.includes(path.toLowerCase()) ? styles.active : ''}>
            {path}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default function PortfolioHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.hero__title)}>
          ✨&nbsp;Portfolio&nbsp;✨
        </Heading>
        <ButtonGroup />
      </div>
    </header>
  );
}
