import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


document.body.appendChild(renderer.domElement);

// ======================
// Controls
// ======================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

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


// =====================
// Grid Helper
// =====================
const gridHelper = new THREE.GridHelper(10, 10,0X444444,0X222222);
scene.add(gridHelper);


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
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;

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

  

//******************************************************************************************************** */
//Creating a loader for the GLTF model
const loader = new GLTFLoader();

loader.load(

    "/models/Heart.glb",

    (gltf) => {

        const heart = gltf.scene;

        const box = new THREE.Box3().setFromObject(heart);
        console.log(box)


        const center = box.getCenter(new THREE.Vector3());
        console.log(center)


        heart.position.sub(center); // Center the model


        const size = box.getSize(new THREE.Vector3());
        console.log(size)

        const maxDimension = Math.max(size.x, size.y, size.z);

        heart.position.sub(center);

        scene.add(heart);

        camera.position.set(0,0,maxDimension * 2);

        controls.target.set(0,0,0);

        controls.update();




        // Inspect materials
        heart.traverse((child) => {

            if (child.isMesh) {

                child.castShadow = true;
                child.receiveShadow = true;

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

    const delta = clock.getDelta();

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


