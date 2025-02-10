# Face Landmarks Detection with TensorFlow.js 🎯
This project demonstrates real-time face landmarks detection using TensorFlow.js and your device's webcam. The app detects facial features like eyes, nose, mouth, and the overall face contour in real-time—all running directly in your browser.

## Key Features ✨
1) Real-time face detection using a live webcam feed. 📹
2) Facial landmarks detection including eyes, nose, mouth, and face contour. 👁️
3) Completely runs in the browser using TensorFlow.js—no backend needed. 🚀
4) Easy to set up and use—just run locally or host it on a static server. 🛠️

## Getting Started 🚀
To get the project running on your local machine:
1) Clone the repository:
   ```
   git clone https://github.com/VivekDahiya06/TensorFlow.Js.git
   ```
2) Navigate to project directory:
   ```
   cd "Face Landmarks Detection"
   ```
3) Install dependencies:
   ```
   npm install
   ```
4) Start the development server:
   ```
   npm start
   ```
5) Open http://localhost:3000 in your browser.


## How It Works 🧠
- The app uses the **Webcam API** to capture video input directly from your browser.
- **TensorFlow.js** processes the video feed using a pre-trained face landmarks detection model.
- Detected facial landmarks are drawn on the video feed in real-time, showing key points like eyes, nose, and mouth.

## Images 🖼️
### Face Landmarks
<img src="/Face%20Landmarks%20Detection/public/Face_landmarks_Image.png" alt="Face Construct Example" width="350" height="350">

### Face Map
<img src="/Face%20Landmarks%20Detection/public/face_map.jpg" alt="Face Construct Map" width="350" height="350">
Note :-If you close in to the Face Map you will see many points on the map which indicate how our model maps different part of our face and one thing to note is that the mapping always starts from the nose</p>


## Requirements 🛠️
- Node.js (for running the project locally).
- A browser that supports TensorFlow.js and webcam access (such as Chrome or Firefox).

## Technologies Used 💻
- TensorFlow.js: Machine learning in the browser.
- JavaScript: For app logic and TensorFlow integration.
- HTML5 & CSS: For the front-end interface.
- Web APIs: For accessing the webcam and rendering live video.

## Live Link 🔴
[![Netlify Status](https://api.netlify.com/api/v1/badges/e71b73c1-23ae-4e34-b5f5-7404b91b5164/deploy-status)](https://facelandmarksdetections.netlify.app)

## Contributing 🤝
Contributions are welcome! To contribute:
1) Fork this repository.
2) Create a new branch (git checkout -b feature-name).
3) Commit your changes (git commit -m 'Add feature').
4) Push to the branch (git push origin feature-name).
5) Open a pull request.

## Acknowledgments 🙌
TensorFlow.js for providing a powerful library for running machine learning models in the browser.

