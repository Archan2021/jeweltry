import { config } from '../config/env.js';
import styles from './BottomPromos.module.css';

const promos = [
  {
    title: 'Sapphire Elegance',
    subtitle: 'Limited Edition',
    category: 'Earrings',
    background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    image: config.getAssetPath('/Earing/earring2.png'),
  },
  {
    title: 'Dark Sickle',
    subtitle: '100% Authentic',
    category: 'Earrings',
    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
    image: config.getAssetPath('/Earing/earring4.png'),
  },
  {
    title: 'Golden Aura',
    subtitle: 'Luxury Redefined',
    category: 'Earrings',
    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    image: config.getAssetPath('/Earing/earring6.png'),
  },
];

const BottomPromos = ({ onTryOn }) => {
  return (
    <div className={styles.promoGrid}>
      {promos.map((promo, index) => (
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

export default BottomPromos;
