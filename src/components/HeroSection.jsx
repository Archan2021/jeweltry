import { config } from '../config/env.js';
import styles from './HeroSection.module.css';

const HeroSection = ({ onTryOn }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.badge}>Realistic JewelTry on</div>
        <h1 className={styles.heroTitle}>
          Stylish Jewelry
          <br />
          Fashion For All
        </h1>
        <button
          className={styles.shopBtn}
          onClick={() =>
            onTryOn({
              name: 'Stylish Gold Earring',
              image: config.getAssetPath('/Earing/earring5.png'),
              category: 'Earrings',
            })
          }
        >
          Try Now
        </button>
      </div>
      <div className={styles.heroImage}>
        <img
          src={config.getAssetPath('/Earing/earring5.png')}
          alt='gold earring'
        />
      </div>
    </section>
  );
};

export default HeroSection;
