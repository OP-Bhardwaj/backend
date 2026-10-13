import React, { useEffect, useRef, useState } from 'react';
import { initializeMediaPipe } from '../utils/utils';

export default function FaceExpressionReader() {
  const [expression, setExpression] = useState("Loading model...");
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const requestRef = useRef(null);

  // 1. Initialize MediaPipe inside useEffect
  useEffect(() => {
    // Sab kuch utils function mein pass kar rahe hain
    initializeMediaPipe(landmarkerRef, requestRef, videoRef, setExpression);

    // Cleanup function jab component unmount ho
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem' }}>
      <h2>MediaPipe Face Expression Reader</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{ 
            width: '100%', 
            maxWidth: '600px', 
            borderRadius: '10px', 
            transform: 'scaleX(-1)',
            backgroundColor: '#000'
          }} 
        />
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'inline-block' }}>
        <h3 style={{ margin: 0 }}>
          Expression: <span style={{ color: '#0056b3' }}>{expression}</span>
        </h3>
      </div>
    </div>
  );
}