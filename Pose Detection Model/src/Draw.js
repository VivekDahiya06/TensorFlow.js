import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS } from './keypointsConnections'; // Import the pairs array

const Draw = ({ keypoints3D }) => {
    const canvasRef = useRef(null);
    const pointsRef = useRef(null); // Reference to points mesh
    const linesRef = useRef(null);  // Reference to lines mesh

    useEffect(() => {
        const size = { width: 500, height: 500 };
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 1);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.01, 1000);
        camera.position.set(3, 1, 3);

        // Add orbit controls for interactive rotation and zooming
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Add axes helper to visualize orientation
        const axisHelper = new THREE.AxesHelper(5);
        scene.add(axisHelper);

        // Create initial points mesh to represent 3D keypoints
        const pointsGeometry = new THREE.BufferGeometry();
        const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.04 });
        pointsRef.current = new THREE.Points(pointsGeometry, pointsMaterial);
        scene.add(pointsRef.current);

        // Create initial lines to connect the keypoints
        const linesGeometry = new THREE.BufferGeometry();
        const linesMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        linesRef.current = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesRef.current);

        // Animation loop
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            const { clientWidth, clientHeight } = canvasRef.current.parentElement;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function to dispose of resources
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            pointsGeometry.dispose();
            pointsMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            controls.dispose();
        };
    }, []);

    // Update points and lines when keypoints3D changes
    useEffect(() => {
        if (keypoints3D && pointsRef.current && linesRef.current) {
            // Update points
            const positions = new Float32Array(keypoints3D.length * 3);
            keypoints3D.forEach((point, i) => {
                positions[i * 3] = -point.x;       // Invert x-axis
                positions[i * 3 + 1] = -point.y;  // Invert y-axis
                positions[i * 3 + 2] = -point.z;  // Keep z-axis as is
            });
            pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            pointsRef.current.geometry.attributes.position.needsUpdate = true;

            // Update lines
            const linePositions = new Float32Array(BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS.length * 2 * 3); // 2 points per line
            BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS.forEach(([start, end], i) => {
                const startIndex = start * 3;
                const endIndex = end * 3;

                // Start point
                linePositions[i * 6] = positions[startIndex];
                linePositions[i * 6 + 1] = positions[startIndex + 1];
                linePositions[i * 6 + 2] = positions[startIndex + 2];

                // End point
                linePositions[i * 6 + 3] = positions[endIndex];
                linePositions[i * 6 + 4] = positions[endIndex + 1];
                linePositions[i * 6 + 5] = positions[endIndex + 2];
            });
            linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            linesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }, [keypoints3D]);

    return <canvas ref={canvasRef} width="500" height="500" />;
};

export default Draw;