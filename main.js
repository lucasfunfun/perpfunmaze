
import * as THREE from 'https://cdn.skypack.dev/three';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Player
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc })
);
player.position.y = 0.5;
scene.add(player);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 100),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
scene.add(floor);

// Lane Visuals
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const longLineGeo = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-3, 0.01, 0),
  new THREE.Vector3(-3, 0.01, 100)
]);
const shortLineGeo = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(3, 0.01, 0),
  new THREE.Vector3(3, 0.01, 100)
]);
scene.add(new THREE.Line(longLineGeo, lineMaterial));
scene.add(new THREE.Line(shortLineGeo, lineMaterial));

// Camera Setup
camera.position.set(0, 5, -10);
camera.lookAt(0, 0.5, 5);

// Movement
let currentLane = 0;
const laneXPositions = { '-1': -2, '0': 0, '1': 2 };
let zPos = 0;
let forwardPressed = false;

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft' && currentLane > -1) currentLane -= 1;
  if (e.code === 'ArrowRight' && currentLane < 1) currentLane += 1;
  if (e.code === 'ArrowUp') forwardPressed = true;
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowUp') forwardPressed = false;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (forwardPressed) zPos += 0.1;
  player.position.z = zPos;
  player.position.x = laneXPositions[currentLane];

  renderer.render(scene, camera);
}

animate();
