import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";
import "./style.css";
import { createLayout } from "./ui/layout.js";


// ======================
// Scene
// ======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// ======================
// Camera
// ======================
// const camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );


createLayout();
const viewer = document.getElementById("viewer");
const camera = new THREE.PerspectiveCamera(
    45,
    viewer.clientWidth / viewer.clientHeight,
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

renderer.setSize(viewer.clientWidth, viewer.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;

renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// document.body.appendChild(renderer.domElement);
document.getElementById("viewer").appendChild(renderer.domElement);

// ======================
// Controls
// ======================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

controls.rotateSpeed = 0.8;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.6;

controls.minDistance = 1.5;
controls.maxDistance = 15;

controls.enablePan = true;
controls.maxPolarAngle = Math.PI * 0.95;
controls.minPolarAngle = 0.1;


// ======================
// Axes Helper
// ======================
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// // =====================
// // Grid Helper
// // =====================
// const gridHelper = new THREE.GridHelper(10, 10,0X444444,0X222222);
// scene.add(gridHelper);


//Fog
scene.fog = new THREE.Fog(0x111111, 12, 30);


//Reset Camera Position
function resetCamera() {
    camera.position.set(0, 0, 5);
    controls.target.set(0, 0, 0);
    controls.update();
}

// Call the function to reset the camera position
resetCamera();

//Clock
const clock = new THREE.Clock();






/*****************************************************/
// ======================
// Lights
// ======================
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);

// Main Light
const mainLight = new THREE.DirectionalLight(0xffffff, 4);
mainLight.position.set(6, 8, 6);
mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;

mainLight.shadow.camera.near = 0.5;
mainLight.shadow.camera.far = 30;
mainLight.shadow.bias = -0.0005;

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

/***********LOADING THE HDR*********/
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
    "/hdr/studio_small_03_1k.hdr",texture => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });

//Creating a floor to receive shadows++++++++++++++++++++++++++++++
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.ShadowMaterial({ 
    color:0x2d2d2d ,
    roughness: 1
 });

 const floor = new THREE.Mesh(floorGeometry, floorMaterial);
 floor.rotation.x = -Math.PI / 2;
 floor.position.y = -2;
 floor.receiveShadow = true;
 scene.add(floor);

//Creating a loader for the GLTF model
const loadingManager = new THREE.LoadingManager();

const loadingBar = document.getElementById("loading-progress");
const loadingText = document.getElementById("loading-text");

loadingManager.onProgress = (url, loaded, total) => {
    const percent = (loaded / total) * 100;
    loadingBar.style.width = `${percent}%`;
    loadingText.innerHTML = `Loading: ${Math.round(percent)}%`;

};

loadingManager.onLoad = () => {
    const screen = document.getElementById("loading-screen");
    screen.style.opacity = 0;
    setTimeout(() => {
        screen.style.display = "none";
    }, 600);

};

const loader = new GLTFLoader(loadingManager);



  

//******************************************************************************************************** */
//Creating a loader for the GLTF model
// const loader = new GLTFLoader();


loader.load(

    "/models/Heart.glb",

    (gltf) => {

        const heart = gltf.scene;

        // ---------- Bounding Box ----------
        const box = new THREE.Box3().setFromObject(heart);

        const center = new THREE.Vector3();
        box.getCenter(center);

        const size = new THREE.Vector3();
        box.getSize(size);

        // ---------- Center Model ----------
        heart.position.x = -center.x;
        heart.position.y = -center.y;
        heart.position.z = -center.z;

        // ---------- Camera ----------
        const maxDim = Math.max(size.x, size.y, size.z);

        camera.position.set(0, 0, maxDim * 2.5);
        camera.lookAt(0,0,0);
        controls.target.set(0, 0, 0);
        controls.update();

        // camera.near = maxDim / 100;
        // camera.far = maxDim * 100;

        // camera.updateProjectionMatrix();

        
    

        // ---------- Shadows ----------
        heart.traverse((child) => {

            if (child.isMesh) {

                child.castShadow = true;
                child.receiveShadow = true;

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

    const delta = clock.getDelta();

    controls.update();

    renderer.render(scene, camera);

}

animate();

// ======================
// Resize
// ======================
window.addEventListener("resize", () => {

    

    camera.aspect = viewer.clientWidth / viewer.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(viewer.clientWidth, viewer.clientHeight);

    // renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);

});


