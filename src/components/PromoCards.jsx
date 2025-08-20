import { config } from '../config/env.js';
import styles from './PromoCards.module.css';

const promoData = [
  {
    title: 'Chandler Necklace',
    subtitle: 'Top Quality Product',
    category: 'Necklaces',
    background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    image: config.getAssetPath('/Necklace/neck4.png'),
  },
  {
    title: 'Ruby Necklace',
    subtitle: 'Red Gemstone',
    category: 'Necklaces',
    background: 'linear-gradient(135deg, #34D399, #10B981)',
    image: config.getAssetPath('/Necklace/neck5.png'),
  },
  {
    title: 'Maharani Necklace',
    subtitle: 'Royal Elegance',
    category: 'Necklaces',
    background: 'linear-gradient(135deg, #F472B6, #EC4899)',
    image: config.getAssetPath('/Necklace/neck6.png'),
  },
];

const PromoCards = ({ onTryOn }) => {
  return (
    <div className={styles.promoGrid}>
      {promoData.map((promo, index) => (
        <div
          key={index}
          className={styles.promoCard}
          style={{ background: promo.background }}
        >
          <div className={styles.promoContent}>
            <h3 className={styles.promoTitle}>{promo.title}</h3>
            {promo.subtitle && (
              <p className={styles.promoSubtitle}>{promo.subtitle}</p>
            )}
            <button
              className={styles.promoBtn}
              onClick={() =>
                onTryOn({
                  name: promo.title,
                  image: promo.image,
                  category: promo.category,
                })
              }
            >
              Try Now
            </button>
          </div>
          <div className={styles.promoImage}>
            <img
              src={promo.image || '/placeholder.svg'}
              alt={promo.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCards;
