# Pose Estimation with 3D Projection 🤖

## Overview 🚀
This project demonstrates real-time 3D pose estimation using advanced web technologies and machine learning models. By leveraging a pre-trained pose estimation model, the application detects and tracks 33 human body landmarks and reconstructs them into an interactive 3D visualization.

## Features 🌟
- **Real-time Pose Detection 🧍‍♂️:** Utilizes BlazePose to accurately track body landmarks.
- **3D Pose Reconstruction 🏃:** Employs Three.js for smooth and precise 3D visualizations of human motion.
- **Interactive Visualization ✨:** Enables users to see pose estimation results in real-time through dynamic rendering.
- **Efficient Inference ⚡:** TensorFlow.js ensures fast model inference and seamless performance on web platforms.

## Technologies Used 🔧
- **Frontend Framework:** [React](https://react.dev)
- **Webcam Integration:** [React Webcam](https://github.com/mozmorris/react-webcam)
- **3D Graphics:** [Three.js](https://threejs.org)
- **UI Components:** [Material-UI](https://mui.com)
- **Animations:** [Framer Motion](https://www.framer.com/motion)
- **Machine Learning:** [TensorFlow.js](https://www.tensorflow.org/js)

## How It Works 🛠️
1. **Pose Detection:** The application integrates BlazePose, which accurately detects 33 key body landmarks in real time.
2. **3D Projection:** Detected 2D points are projected onto a 3D canvas using Three.js.
3. **Rendering:** Three.js visualizes user poses smoothly and interactively.
4. **User Interaction:** The interface supports dynamic interactions and provides an engaging visual experience.

## Setup Instructions 🗒️
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd "Pose Detection Model"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage 🖥️
- Ensure your webcam is connected and accessible by your browser.
- Observe the real-time 3D projection of your pose.

## Screenshots 📷
### Example of Real-Time Pose Detection
![Pose 1](/Pose%20Detection%20Model/src/assets/images/pose_1.png)
![Pose 2](/Pose%20Detection%20Model/src/assets/images/pose_2.png)
![Pose 3](/Pose%20Detection%20Model/src/assets/images/pose_3.png)
![Pose 4](/Pose%20Detection%20Model/src/assets/images/pose_4.png)
![Pose 5](/Pose%20Detection%20Model/src/assets/images/pose_5.png)
### 3D Pose Visualization
![3D Pose Visualization](/Pose%20Detection%20Model/src/assets/images/blazepose_landmarks.png)

## Future Enhancements 🚀
- Improve inference performance for low-powered devices.
- Add additional models for pose estimation (e.g., hands or face tracking).
- Enhance visualization with skeletal animations.

## Acknowledgments 🏆
- The BlazePose team for their robust and efficient pose estimation model.
- The Three.js community for their extensive resources.
- TensorFlow.js contributors for enabling machine learning on web platforms.

