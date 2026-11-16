import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';

export const init = async ({ landmarkerRef, videoRef, streamRef, setExpression }) => {
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

    if (setExpression) setExpression("Model loaded. Starting camera...");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (streamRef) streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        if (setExpression) setExpression("Ready! Click 'Detect expression'");
      }
    }
  } catch (error) {
    console.error("Error initializing MediaPipe/Camera:", error);
    if (setExpression) setExpression("Camera or model error.");
  }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (!videoRef.current || !landmarkerRef.current || videoRef.current.readyState < 2) {
    return "Neutral";
  }

  const startTimeMs = performance.now();
  const results = landmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

  let currentExpression = "Neutral";

  if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
    const shapes = results.faceBlendshapes[0].categories;

    const smileLeft = shapes.find(s => s.categoryName === 'mouthSmileLeft')?.score || 0;
    const smileRight = shapes.find(s => s.categoryName === 'mouthSmileRight')?.score || 0;
    const jawOpen = shapes.find(s => s.categoryName === 'jawOpen')?.score || 0;
    const browUp = shapes.find(s => s.categoryName === 'browInnerUp')?.score || 0;
    const frownLeft = shapes.find(s => s.categoryName === 'mouthFrownLeft')?.score || 0;
    const frownRight = shapes.find(s => s.categoryName === 'mouthFrownRight')?.score || 0;

    if (smileLeft > 0.5 || smileRight > 0.5) {
      currentExpression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
      currentExpression = "surprised";
    } else if (frownLeft > 0.01 && frownRight > 0.01) {
      currentExpression = "sad";
    }
  }

  if (setExpression) setExpression(currentExpression);
  return currentExpression;
};