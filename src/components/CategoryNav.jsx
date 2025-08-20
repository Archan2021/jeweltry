import { config } from '../config/env.js';
import styles from './CategoryNav.module.css';

const categories = [
  {
    name: 'Earrings',
    count: '6 Products',
    icon: config.getAssetPath('/Earing/earring1.png'),
  },
  {
    name: 'Necklace',
    count: '6 Products',
    icon: config.getAssetPath('/Necklace/neck6.png'),
  },
];

const CategoryNav = () => {
  return (
    <div className={styles.categoryNav}>
      <div className={styles.container}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.categoryItem}
          >
            <img
              src={category.icon}
              className={styles.categoryIcon}
              alt={category.name}
            />
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <span className={styles.categoryCount}>{category.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
