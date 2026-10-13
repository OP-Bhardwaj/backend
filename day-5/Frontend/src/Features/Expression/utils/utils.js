import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';

export const initializeMediaPipe = async (landmarkerRef, requestRef, videoRef, setExpression) => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO"
    });
    
    setExpression("Model loaded. Waiting for camera...");
    // Pass everything to the camera function
    startCamera(videoRef, landmarkerRef, requestRef, setExpression);
  } catch (error) {
    console.error("Error loading MediaPipe:", error);
    setExpression("Error loading model.");
  }
}

export const startCamera = async (videoRef, landmarkerRef, requestRef, setExpression) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait until the video is ready before starting the analysis loop
        videoRef.current.addEventListener("loadeddata", () => {
            analyzeFrame(videoRef, landmarkerRef, requestRef, setExpression);
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setExpression("Camera access denied.");
    }
  }
};

export const analyzeFrame = (videoRef, landmarkerRef, requestRef, setExpression) => {
  if (videoRef.current && landmarkerRef.current && videoRef.current.readyState >= 2) {
    const startTimeMs = performance.now();
    const results = landmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);
    
    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
      const shapes = results.faceBlendshapes[0].categories;
      
      const smileLeft = shapes.find(s => s.categoryName === 'mouthSmileLeft')?.score || 0;
      const smileRight = shapes.find(s => s.categoryName === 'mouthSmileRight')?.score || 0;
      const jawOpen = shapes.find(s => s.categoryName === 'jawOpen')?.score || 0;
      const browInnerUp = shapes.find(s => s.categoryName === 'browInnerUp')?.score || 0;

      if (smileLeft > 0.5 && smileRight > 0.5) {
        setExpression("Smiling 😄");
      } else if (jawOpen > 0.04 && browInnerUp > 0.04) {
        setExpression("Surprised 😲");
      } else {
        setExpression("Neutral 😐");
      }
    } else {
      setExpression("No face detected");
    }
  }
  
  // Keep loop running by passing the variables back into it
  requestRef.current = requestAnimationFrame(() => analyzeFrame(videoRef, landmarkerRef, requestRef, setExpression));
};