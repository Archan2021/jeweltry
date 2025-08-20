import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Gemtry</h1>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.contact}>
            <span className={styles.hotlineLabel}>Contact Us</span>
            <span className={styles.phone}>
              <a
                href='https://twinverse.in'
                target='_blank'
                rel='noopener noreferrer'
              >
                Twinverse.in
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
