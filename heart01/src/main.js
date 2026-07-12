import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

// ======================
// Scene
// ======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// ======================
// Camera
// ======================
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);

// ======================
// Renderer
// ======================
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

document.body.appendChild(renderer.domElement);

// ======================
// Controls
// ======================
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

// ======================
// Lights
// ======================
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);

// Main Light
const mainLight = new THREE.DirectionalLight(0xffffff, 4);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);

// Fill Light
const fillLight = new THREE.DirectionalLight(0xffffff, 2);
fillLight.position.set(-5, 5, -5);
scene.add(fillLight);

// Bottom Light
const bottomLight = new THREE.DirectionalLight(0xffffff, 1.5);
bottomLight.position.set(0, -5, 5);
scene.add(bottomLight);

// Back Light
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 5, -10);
scene.add(backLight);

//******************************************************************************************************** */
//Creating a loader for the GLTF model
const loader = new GLTFLoader();

loader.load(

    "/models/Heart.glb",

    (gltf) => {

        const heart = gltf.scene;

        // Inspect materials
        heart.traverse((child) => {

            if (child.isMesh) {

                console.log(child.material);

            }

        });

        scene.add(heart);

        console.log("Heart Loaded!");

    },

    undefined,

    (error) => {

        console.error(error);

    }

);






// ======================
// Animation
// ======================
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();

// ======================
// Resize
// ======================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});