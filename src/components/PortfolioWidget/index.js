import clsx from 'clsx';
import Heading from '@theme/Heading';
import GithubLogo from './img/githubLogo.svg';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '行動翻頁飛天魔毯 - 圖上影下',
    url: 'https://rich-media-gallery.adneon.com.tw/instance/26683',
    video: require('./video/mobile-multilayer-flying-carpet.mov').default,
    description: (
      <>
        由三張等比例圖片與置底影片組成，打造沉浸的廣告體驗，搭配圖片的滑動翻頁效果，立刻抓住消費者眼球，有效提高品牌考慮度。
      </>
    ),
    badges: ['廣告版型', 'JavaScript']
  },
  {
    title: '行動置底 - 開箱 Unbox',
    url: 'https://rich-media-gallery.adneon.com.tw/instance/24817',
    video: require('./video/universal-open-door-popup.mov').default,
    description: (
      <>
        只要上傳兩張圖片素材，就能創造吸睛的視覺效果！隨著用戶滑動、瀏覽頁面，呈現開箱驚喜、收合趣味。
      </>
    ),
    badges: ['廣告版型', 'JavaScript']
  },
  {
    title: '桌機飛天魔毯',
    url: 'https://rich-media-gallery.adneon.com.tw/instance/26359',
    video: require('./video/desktop-interstitial.mov').default,
    description: (
      <>
        當受眾滑動至特定位置時，飛天魔毯將隨著使用者的滑動展開與收合。讓品牌得以在不影響閱讀體驗的情況下，以充足的版面呈現詳細資訊。
      </>
    ),
    badges: ['廣告版型', 'JavaScript']
  },
  {
    title: '名單型廣告 （桌機 / 手機）',
    url: 'https://rich-media-gallery.adneon.com.tw/instance/24772',
    video: require('./video/universal-lead-ad.mov').default,
    description: (
      <>
        提供活動報名、搜集回饋的功能，可自訂問卷題目，活用性高！只要一張主視覺與品牌 logo 即可進稿，簡單好操作。
      </>
    ),
    badges: ['廣告版型', 'JavaScript']
  },
  {
    title: '旋轉木馬圖卡 + 上方橫幅',
    url: 'https://rich-media-gallery.adneon.com.tw/instance/23141',
    video: require('./video/universal-top-banner-with-slide.mov').default,
    description: (
      <>
        除了可上傳多張商品卡片外，還能上傳上方橫幅圖片，適合大型購物季溝通產品折扣使用。
      </>
    ),
    badges: ['廣告版型', 'JavaScript']
  }
];

function Feature({ img, video, title, url, description, badges, githubUrl }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="text--center">
        <a href={url} target="_blank">
          {img && <img src={img} className={styles.featureImg} role="img" />}
          {video && <video src={video} className={styles.featureVideo} loop muted autoPlay />}
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          {title}
          {githubUrl &&
            <a href={githubUrl} target="_blank">
              <GithubLogo className={styles.githubLogo} />
            </a>
          }
        </Heading>
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
