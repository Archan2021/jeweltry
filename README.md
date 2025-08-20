# TryOn Modal System

This project includes an advanced AR jewelry try-on modal system that allows users to virtually try on earrings and necklaces using their webcam.

## Features

- **Real-time Face Detection**: Uses MediaPipe FaceMesh for accurate face landmark detection
- **AR Jewelry Overlay**: Overlays jewelry images on appropriate face positions
- **Multi-Product Support**: Supports both earrings and necklaces with different positioning logic
- **Head Tracking**: Adjusts jewelry visibility based on head orientation
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful modal interface with loading states and error handling

## How It Works

### Components

1. **TryOnModal.jsx**: Main modal component that handles:

   - Camera access and video streaming
   - Face mesh detection and landmark tracking
   - Jewelry positioning and rendering
   - Head orientation detection

2. **TryOnModal.css**: Styling for the modal interface

### Integration

The modal is integrated into the main app through:

1. **App.jsx**: Manages modal state and passes handlers to child components
2. **Product Components**: All components with "Try Now" buttons (FeaturedProducts, BottomPromos, PromoCards, HeroSection) can trigger the modal

### Usage

When a user clicks any "Try Now" button:

1. The modal opens and requests camera access
2. MediaPipe FaceMesh detects facial landmarks
3. Jewelry is positioned based on product category:
   - **Earrings**: Positioned at ear landmarks with head tracking
   - **Necklaces**: Positioned below the chin area
4. Real-time rendering shows the jewelry on the user's face

### Technical Details

- **MediaPipe Integration**: Loaded via CDN for face mesh detection
- **Canvas Rendering**: Real-time video processing and overlay rendering
- **Head Tracking**: Yaw angle calculation for realistic earring display
- **Responsive**: Adapts to different screen sizes and orientations

### Browser Compatibility

- Requires modern browsers with WebRTC support
- Camera access permission required
- Works best in well-lit environments

## Try On Button Locations

- Hero Section: Main "Try Now" button
- Featured Products: Individual product "Try Now" buttons
- Bottom Promos: Promotional earring cards
- Promo Cards: Necklace promotional cards

Each button passes the product image, name, and category to the modal for appropriate rendering.
