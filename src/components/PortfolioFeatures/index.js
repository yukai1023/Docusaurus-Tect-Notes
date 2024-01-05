import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'cacaFly Cloud Connect',
    url: 'https://connect.cacafly.com/',
    img: require('./img/cacaflyCloud.png').default,
    description: (
      <>
        主要為 B2B 的整合交易平台，從零開始建構完整的專案架構，
        並實作登入系統、角色權限、表單資料處理、購買支付流程、錯誤處理、報表開發與數據可視化...等等功能。
      </>
    ),
    badges: ['React.js', 'Redux Toolkit', 'Bootstrap', 'Scss', 'Formik', 'Yup', 'i18n', 'Webpack']
  },
  {
    title: 'Adneon - Rich Media Gallery',
    url: 'https://rich-media-gallery.adneon.com.tw/',
    img: require('./img/richMediaGallery.png').default,
    description: (
      <>
        串接 Google Sheets API 取得資料，並設計了數據處理與介面產生的流程，
        即使非技術人員也能輕鬆操作表單填加案例，降低了錯誤率，並更加標準化與自動化。
      </>
    ),
    badges: ['React.js', 'MUI', 'Scss', 'RWD', 'i18n', 'Webpack']
  },
  {
    title: 'X-Talent',
    url: 'https://xchange-talent-pool.vercel.app/',
    img: require('./img/x-talent.png').default,
    description: (
      <>
        參加 XChange 組織並與其他工程師協力創建人才庫專案，網站持續開發中尚未正式上線，
        目前負責的部分已完成的為：landing page。
      </>
    ),
    badges: ['Next.js', 'TypeScript', 'Tailwind', 'RWD']
  },
  {
    title: '叶舍空間製作所',
    url: 'https://yukai1023.github.io/Interior-Design-Website/',
    img: require('./img/yhouseDesign.png').default,
    description: (
      <>
        設計與建構室內設計公司官網，具備與響應式網頁、圖片輪播效果、連結其它的網頁等功能。
      </>
    ),
    badges: ['Vue.js', 'Bootstrap', 'Scss', 'RWD']
  },
  {
    title: 'Simple Twitter',
    url: 'https://yukai1023.github.io/Interior-Design-Website/',
    img: require('./img/alphaTwitter.png').default,
    description: (
      <>
        建構相仿 Twitter 的頁面與功能，具備登入系統、新增回覆推文、
        追蹤使用者等功能。
      </>
    ),
    badges: ['Vue.js', 'Vuex', 'Bootstrap']
  },
];

function Feature({ img, title, url, description, badges }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="text--center">
        <a href={url} target="_blank">
          <img src={img} className={styles.featureImg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className={styles.description}>{description}</p>
        {badges?.map((badge) => (
          <span className={styles.badge}>{badge}</span>
        ))}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
