import { useState } from 'react';
import { config } from '../config/env.js';
import styles from './FeaturedProducts.module.css';

const products = [
  {
    id: 1,
    name: 'Elegant Gold Hoop Earrings',
    category: 'Earrings',
    rating: 4.8,
    reviews: 150,
    image: config.getAssetPath('/Earing/earring3.png'),
  },
  {
    id: 2,
    name: 'Delicate Silver Chain Necklace',
    category: 'Necklaces',
    rating: 4.5,
    reviews: 210,
    image: config.getAssetPath('/Necklace/neck1.png'),
  },
  {
    id: 3,
    name: 'Sparkling Red Diamond Earrings',
    category: 'Earrings',
    rating: 4.9,
    reviews: 95,
    image: config.getAssetPath('/Earing/earring1.png'),
  },
  {
    id: 4,
    name: 'Vintage Pearl Drop Necklace',
    category: 'Necklaces',
    rating: 4.6,
    reviews: 120,
    image: config.getAssetPath('/Necklace/neck3.png'),
  },
];

const FeaturedProducts = ({ onTryOn }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Earrings', 'Necklaces'];

  return (
    <section className={styles.featured}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Products</h2>
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${
                activeFilter === filter ? styles.active : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productGrid}>
        {products
          .filter(
            (product) =>
              activeFilter === 'All' || product.category === activeFilter
          )
          .map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className={styles.productInfo}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className={styles.reviews}>({product.reviews})</span>
                </div>

                <button
                  className={styles.selectBtn}
                  onClick={() => onTryOn(product)}
                >
                  Try Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
