import { useEffect, useRef, useState } from 'react';
import './TryOnModal.css';

function TryOnModal({
  open,
  onClose,
  productImage,
  productName,
  productCategory,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMeshRef = useRef(null);
  const jewelryImg = useRef(new Image());
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    if (!open) return;
    const videoEl = videoRef.current; // Set the product image as the jewelry
    jewelryImg.current.src = productImage;
    jewelryImg.current.crossOrigin = 'anonymous';

    // Initialize FaceMesh
    const initFaceMesh = async () => {
      // Check if FaceMesh is available in the window object
      if (typeof window !== 'undefined' && 'FaceMesh' in window) {
        const FaceMesh = window.FaceMesh;

        faceMeshRef.current = new FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
          },
        });

        await faceMeshRef.current.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMeshRef.current.onResults(onResults);

        // Start camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user',
              },
            });

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              await videoRef.current.play();
              setCameraActive(true);
              sendToFaceMesh();
            }
          } catch (err) {
            console.error('Error accessing camera:', err);
            setCameraError(true);
          }
        }
      } else {
        console.error('FaceMesh is not available');
        const script = document.createElement('script');
        script.src =
          'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        script.onload = initFaceMesh;
      }
    };

    const sendToFaceMesh = async () => {
      if (videoRef.current && canvasRef.current && faceMeshRef.current) {
        await faceMeshRef.current.send({ image: videoRef.current });
      }
      if (open) {
        requestAnimationFrame(sendToFaceMesh);
      }
    };

    const onResults = (results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions to match video
      if (results.image.width && results.image.height) {
        const aspectRatio = results.image.width / results.image.height;

        // Determine if we should use width or height as the constraint
        if (canvas.width / aspectRatio > canvas.height) {
          // Height is the constraint
          canvas.width = canvas.height * aspectRatio;
        } else {
          // Width is the constraint
          canvas.height = canvas.width / aspectRatio;
        }
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the video feed first
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        results.multiFaceLandmarks.forEach((landmarks) => {
          if (productCategory === 'Necklaces') {
            drawNecklace(ctx, landmarks);
          } else {
            drawEarMesh(ctx, landmarks);
          }
        });
      }

      ctx.restore();
    };
    const drawNecklace = (ctx, landmarks) => {
      // Get ear and chin landmarks for necklace positioning
      const chin = landmarks[152]; // Chin point
      const leftEar = landmarks[132]; // Left ear
      const rightEar = landmarks[361]; // Right ear

      // Calculate necklace position based on ear positions
      const leftEarX = leftEar.x * ctx.canvas.width;
      const leftEarY = leftEar.y * ctx.canvas.height;
      const rightEarX = rightEar.x * ctx.canvas.width;
      const rightEarY = rightEar.y * ctx.canvas.height;

      // Center position between ears
      const centerX = (leftEarX + rightEarX) / 2;
      const centerY = Math.max(leftEarY, rightEarY) + 60; // Below ears on neck

      // Calculate necklace width to span from ear to ear with some extension
      const earDistance = Math.abs(rightEarX - leftEarX);
      const necklaceWidth = earDistance * 1.4; // Make it wider to extend beyond ears
      const necklaceHeight = necklaceWidth * 0.7; // Adjust height proportionally

      // Draw necklace centered between ears
      ctx.drawImage(
        jewelryImg.current,
        centerX - necklaceWidth / 2,
        centerY,
        necklaceWidth,
        necklaceHeight
      );
    };

    const drawEarMesh = (ctx, landmarks) => {
      // Calculate head yaw (left/right turn) using nose and ear landmarks
      const leftCheek = landmarks[234]; // left side of face
      const rightCheek = landmarks[454]; // right side of face
      const noseTip = landmarks[1];

      // Calculate yaw angle in degrees (approximate)
      const dx = rightCheek.x - leftCheek.x;

      // The nose x position relative to the midpoint between cheeks
      const midX = (leftCheek.x + rightCheek.x) / 2;
      const noseOffset = noseTip.x - midX;

      // The width between cheeks in normalized coordinates
      const faceWidth = Math.abs(dx);

      // Yaw: nose offset as a fraction of face width, scaled to degrees
      let yaw = 0;
      if (faceWidth > 0) {
        yaw = (noseOffset / faceWidth) * 60; // ~60deg max
      }

      // Draw and position earring image at ear points
      const [rx, ry] = [
        landmarks[361].x * ctx.canvas.width,
        landmarks[361].y * ctx.canvas.height,
      ];
      const [lx, ly] = [
        landmarks[132].x * ctx.canvas.width,
        landmarks[132].y * ctx.canvas.height,
      ]; // Calculate size based on face width for better proportions
      const faceWidthPixels = faceWidth * ctx.canvas.width;
      const size = faceWidthPixels * 0.2; // Adjust size relative to face

      // If head turned > 10deg right, show only left earring
      // If head turned < -10deg left, show only right earring
      // Otherwise, show both
      if (yaw > 10) {
        // Show only left earring
        ctx.save();
        ctx.translate(lx - size * 0.85, ly);
        ctx.rotate((10 * Math.PI) / 180);
        ctx.drawImage(jewelryImg.current, -size / 2.5, -size / 2, size, size);
        ctx.restore();
      } else if (yaw < -10) {
        // Show only right earring
        ctx.drawImage(
          jewelryImg.current,
          rx - size / 15,
          ry - size / 1.8,
          size,
          size
        );
      } else {
        // Show both
        ctx.drawImage(
          jewelryImg.current,
          rx - size / 15,
          ry - size / 1.8,
          size,
          size
        );
        ctx.save();
        ctx.translate(lx - size * 0.25, ly); // Move more towards the left
        ctx.rotate((10 * Math.PI) / 180); // Reduce rotation to make it straighter
        ctx.drawImage(jewelryImg.current, -size / 2.5, -size / 2, size, size);
        ctx.restore();
      }
    };

    initFaceMesh();

    return () => {
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }
      if (videoEl?.srcObject) {
        const stream = videoEl.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraActive(false);
      setCameraError(false);
    };
  }, [open, productImage]);

  if (!open) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <button
          className='close-button'
          onClick={onClose}
          aria-label='Close'
        >
          ×
        </button>
        <div className='modal-content'>
          <div className='camera-container'>
            <video
              ref={videoRef}
              className='video-element'
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className='canvas-element'
              width={640}
              height={480}
            />
            {!cameraActive && !cameraError && (
              <div className='camera-loading'>
                <div className='loading-spinner'></div>
                <p>Initializing camera...</p>
              </div>
            )}
            {cameraError && (
              <div className='camera-error'>
                <p>
                  Camera access denied. Please allow camera access to try on
                  products.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='modal-footer'>
          <p className='product-info'>
            Try on the{' '}
            <span className='product-name'>
              {productName || 'selected product'}
            </span>
            !
          </p>
          <p className='instructions'>
            Move your head slowly to see different angles
          </p>
        </div>
      </div>
    </div>
  );
}

export default TryOnModal;
