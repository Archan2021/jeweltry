import { useEffect, useState } from 'react';
import './App.css';
import BottomPromos from './components/BottomPromos';
import CategoryNav from './components/CategoryNav';
import FeaturedProducts from './components/FeaturedProducts';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PromoCards from './components/PromoCards';
import TryOnModal from './components/TryOnModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleTryOn = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const checkAssetsLoaded = async () => {
      try {
        // List of critical assets to check
        const imagesToLoad = [
          './Earing/earring1.png',
          './Earing/earring2.png',
          './Earing/earring3.png',
          './Earing/earring4.png',
          './Earing/earring5.png',
          './Earing/earring6.png',
          './Necklace/neck1.png',
          './Necklace/neck3.png',
          './Necklace/neck4.png',
          './Necklace/neck5.png',
          './Necklace/neck6.png',
        ];

        // Function to preload an image
        const preloadImage = (src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              resolve(); // Resolve anyway to not block loading
            };
            img.src = src;
          });
        };

        // Check if MediaPipe scripts are loaded
        const checkScriptsLoaded = () => {
          return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
              if (typeof window !== 'undefined' && 'FaceMesh' in window) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);

            // Timeout after 10 seconds if scripts don't load
            setTimeout(() => {
              clearInterval(checkInterval);
              console.warn('MediaPipe scripts took too long to load');
              resolve();
            }, 10000);
          });
        };

        // Wait for all assets to load
        await Promise.all([
          ...imagesToLoad.map(preloadImage),
          checkScriptsLoaded(),
          // Ensure DOM is ready
          new Promise((resolve) => {
            if (document.readyState === 'complete') {
              resolve();
            } else {
              window.addEventListener('load', resolve);
            }
          }),
        ]);

        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error loading assets:', error);
        // Set loading to false even if there are errors
        setIsLoading(false);
      }
    };

    checkAssetsLoaded();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#8b5cf6',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            border: '6px solid rgba(255, 255, 255, 0.3)',
            borderTop: '6px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
          }}
        />
        <div
          style={{ color: 'white', fontWeight: '600', marginBottom: '10px' }}
        >
          Loading Gemtry...
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
          Preparing AR try-on experience
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className='App'>
      <Header />
      <CategoryNav />
      <main>
        <HeroSection onTryOn={handleTryOn} />
        <BottomPromos onTryOn={handleTryOn} />
        <FeaturedProducts onTryOn={handleTryOn} />
        <PromoCards onTryOn={handleTryOn} />
      </main>
      <TryOnModal
        open={modalOpen}
        onClose={handleCloseModal}
        productImage={selectedProduct?.image}
        productName={selectedProduct?.name}
        productCategory={selectedProduct?.category}
      />
    </div>
  );
}

export default App;
