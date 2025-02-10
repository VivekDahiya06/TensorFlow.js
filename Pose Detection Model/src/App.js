import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { HiOutlineUpload } from "react-icons/hi";
import { BiSolidWebcam } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';
import Draw from './Draw';

export default function App() {
  const webcamRef = useRef(null);
  const [isWebcamVisible, setIsWebcamVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [detector, setDetector] = useState(null);
  const [keypoints3D, setKeypoints3D] = useState([]);
  const intervalRef = useRef(null);

  // Load the pose detection model
  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'lite',
        static_image_mode: false,
      };
      const loadedDetector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        detectorConfig
      );
      setDetector(loadedDetector);
      console.log('Pose detection model loaded.');
    };
    loadModel();
  }, []);

  // Perform detection on webcam feed at 30 FPS
  useEffect(() => {
    if (isWebcamVisible && detector && webcamRef.current) {
      intervalRef.current = setInterval(() => {
        if (webcamRef.current.video.readyState === 4) {
          detectPoseFromWebcam();
        }
      }, 1000 / 30); // 30 FPS
    } else {
      clearInterval(intervalRef.current);
    }
    console.log(webcamRef);

    return () => clearInterval(intervalRef.current);
  }, [isWebcamVisible, detector]);

  const detectPoseFromWebcam = async () => {
    const video = webcamRef.current.video;
    video.width = video.videoWidth;
    video.height = video.videoHeight;

    const poses = await detector.estimatePoses(video);
    if (poses[0]?.keypoints3D) {
      setKeypoints3D(poses[0].keypoints3D);
    }
    console.log('Webcam poses:', poses);
  };

  const detectPoseFromImage = async (img) => {
    if (!detector) return;
    const poses = await detector.estimatePoses(img);
    if (poses[0]?.keypoints3D) {
      setKeypoints3D(poses[0].keypoints3D);
    }
    console.log('Image poses:', poses);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImage(img);
          detectPoseFromImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div style={{
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: 'flex',
      // flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      // margin: "50px auto",
      // marginTop: '50px'
    }}>
      <Button
        variant="outlined"
        startIcon={<BiSolidWebcam />}
        onClick={() => setIsWebcamVisible((prev) => !prev)}
      >
        {isWebcamVisible ? 'Stop Camera' : 'Start Camera'}
      </Button>

      {isWebcamVisible && (
        <Webcam
          ref={webcamRef}
          videoConstraints={{ facingMode: 'user' }}
          onUserMedia={() => console.log('Webcam feed is active')}
          onUserMediaError={(error) => console.error('Webcam error:', error)}
          style={{ width: '500px', height: '500px' }}
        />
      )}

      {isWebcamVisible && <Draw keypoints3D={keypoints3D} />}

      {image && (
        <div style={{ position: 'relative' }}>
          <img
            src={image.src}
            alt="Uploaded"
            style={{ width: '500px', maxHeight: '500px' }}
          />
          <IoCloseCircle
            style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', cursor: 'pointer', fontSize: '30px' }}
            onClick={() => setImage(null)}
          />
        </div>
      )}

      <Button
        component="label"
        variant="outlined"
        startIcon={<HiOutlineUpload />}
      >
        Upload Image
        <input
          type="file"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </Button>
    </div>
  );
}