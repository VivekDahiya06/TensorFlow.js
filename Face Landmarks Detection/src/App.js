<<<<<<< HEAD
import React,{useRef} from 'react'
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from './Triangulation';
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //load face mesh model
  const runFaceMesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net)
    }, 100);
  }

  //Detect function
  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {

      //Get Video Properties
      // const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set Video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set Canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Make detections
      const face = await net.estimateFaces(webcamRef.current.video);
      console.log(face);

      //Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  }
  runFaceMesh();
  return (
    <>
      <Webcam ref={webcamRef} />
      <canvas ref={canvasRef}></canvas>
    </>
=======
import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawMesh } from './Triangulation';
import { Box, Button } from '@mui/material';
import { HiVideoCamera, HiVideoCameraSlash } from 'react-icons/hi2';
import { motion } from "motion/react"

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [net, setNet] = useState(null);

  // Load face mesh model once
  useEffect(() => {
    const loadModel = async () => {
      const model = await facemesh.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });
      setNet(model);
    };

    loadModel();
  }, []);

  useEffect(() => {
    let interval;
    if (isCameraActive) {
      interval = setInterval(() => {
        detect();
      }, 100);
    } else {
      clearInterval(interval);
    }
    // console.log("Model: ", net);
    return () => clearInterval(interval); // Cleanup interval on unmount or stop
  }, [isCameraActive, net]); // Run when camera state or model is loaded

  // Detect function
  const detect = async () => {
    if (net && webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
  
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
  
      // Match canvas size to video size
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
  
      // Face detection
      const faces = await net.estimateFaces(video);
  
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
  
        // Clear previous drawings
        ctx.clearRect(0, 0, videoWidth, videoHeight);
  
        // Draw landmarks
        drawMesh(faces, ctx);
      }
    }
  };
  

  // Start or stop face mesh detection
  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <Box sx={{
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: { xs: "100px", md: "200px", }
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      // whileTap={{y -100}}
      >
        <Button
          variant='contained'
          endIcon={isCameraActive ? <HiVideoCameraSlash /> : <HiVideoCamera />}
          onClick={toggleCamera}
          sx={{
            fontSize: "1rem",
            position: "absolute",
            top: `${isCameraActive ? "10%" : "50%"}`,
            left: { xs: "45%", sx: "20%", md: "50%" },
            transform: { md: "translate(-50%, -50%)" },
            zIndex: 10,
          }}
        >
          {isCameraActive ? 'Stop Camera' : 'Start Camera'}
        </Button>
      </motion.div>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: { xs: "translate(-50%, 0%)", md: "translate(-50%, -50%)" },
        width: "640px",
        height: "480px",
      }}>
        {isCameraActive && <Webcam ref={webcamRef} />}
        {isCameraActive && <canvas ref={canvasRef}></canvas>}
      </Box>
    </Box>
>>>>>>> 4c0a9d1 (Added all files to git)
  );
}

export default App;