import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Jeweltry</h1>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.contact}>
            <span className={styles.hotlineLabel}>Contact Us</span>
            {/* <span className={styles.phone}>
              <a
                href='https://twinverse.in'
                target='_blank'
                rel='noopener noreferrer'
              >
                Twinverse.in
              </a>
            </span> */}
            <span className={styles.phone}>p
  <a href="tel:+911234567890">+91 12345 67890</a>
</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
