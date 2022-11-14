//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.module.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
//import { FirstPersonControls } from '/src/OrbitalControls.js';
//If three.js was installed from a CDN, use the same CDN to install other components:
import * as THREE from 'three';
import Chunk from '/src/chunk.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var fly = new FirstPersonControls(camera, renderer.domElement);

var geometry = new THREE.BoxGeometry(1,1,1);
var  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var  cube = new THREE.Mesh(geometry,material);


var chunk = new Chunk();
chunk.LoadChunk();
chunk.CreateMesh();
chunk.Render();
scene.add(chunk.mesh);

scene.add(cube);

camera.position.z = 5;


const backgroundColor = 0x87ceeb

scene.fog = new THREE.Fog(backgroundColor, 1, 96)
scene.background = new THREE.Color(backgroundColor)

const sunLight = new THREE.PointLight(0xffffff, 0.5)
sunLight.position.set(500, 500, 500)
scene.add(sunLight)

const sunLight2 = new THREE.PointLight(0xffffff, 0.2)
sunLight2.position.set(-500, 500, -500)
scene.add(sunLight2)

const reflectionLight = new THREE.AmbientLight(0x404040)
scene.add(reflectionLight)

function animate(){
    requestAnimationFrame(animate);
    //fly.update();
    renderer.render(scene, camera);
    //
    cube.rotation.x += 0.01;
    cube.rotation.y -= 0.04;
}
animate();