// import * as THREE from "three";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// window.innerWidth / window.innerHeight;

// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
// })
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(0x111111);
// document.body.appendChild(renderer.domElement);

// camera.position.z = 5;


// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// animate();



// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
// });

// const geometry = new THREE.SphereGeometry(1, 1,1 );

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const ambientLight = new THREE.AmbientLight(0xffffff, 2);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);









import * as THREE from "three";

// =======================
// Scene
// =======================
const scene = new THREE.Scene();

// =======================
// Camera
// =======================
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

// =======================
// Renderer
// =======================
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x111111);

document.body.appendChild(renderer.domElement);

// =======================
// Geometry
// =======================
const geometry = new THREE.BoxGeometry(1, 1, 1);

// =======================
// Material
// =======================
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});

// =======================
// Mesh
// =======================
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// =======================
// Lights
// =======================

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);

// =======================
// Resize
// =======================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

// =======================
// Animation Loop
// =======================
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();