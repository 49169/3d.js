//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.module.js';
//import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import Controls from './Controls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import Stats from 'three/addons/libs/stats.module.js';

//If three.js was installed from a CDN, use the same CDN to install other components:

import * as THREE from 'three';
import Chunk from '/src/chunk.js';
import ChunkManager from '/src/chunkManager.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
const stats = new Stats();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

//var fly = new Controls(camera);
//scene.add(fly.getObject());
var pointLock = new PointerLockControls(camera, renderer.domElement);
//pointLock.lock();
//scene.add(pointLock.getObject());
const controls = new Controls(camera, renderer.domElement, document);
//controls.init();
scene.add(controls.controls.getObject());
//fly.dragToLook = true;
//fly.lookSpeed = 0.002;

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh(geometry,material);

var chunk = new Chunk();
var chunkManager = new ChunkManager();
//chunkManager.init();
//chunkManager.Update();

//console.log(chunkManager.m_pChunks);

for(var i =0 ;i<chunkManager.m_pChunks.length; i++){
    //console.log(chunkManager.m_pChunks[i].mesh);
    for(var j =0; j<chunkManager.m_pChunks[0].length; j++){
        for(var k =0; k<chunkManager.m_pChunks[0][0].length; k++){
            chunkManager.m_pChunks[i][j][k].mesh.position.set(i*16,k*16,j*16);
            //chunkManager.m_pChunks[i][j][k].y = k*16;
            scene.add(chunkManager.m_pChunks[i][j][k].mesh);
        }
    }
}

chunk.LoadChunk();

chunk.CreateMesh();

chunk.Render();

scene.add(chunk.mesh);

scene.add(cube);

camera.position.set( 0, 50, 0);

const backgroundColor = 0x87ceeb

//scene.fog = new THREE.Fog(backgroundColor, 1, 96)
scene.background = new THREE.Color(backgroundColor)

const sunLight = new THREE.PointLight(0xffffff, 0.5)
sunLight.position.set(500, 500, 500)
scene.add(sunLight);

const sunLight2 = new THREE.PointLight(0xffffff, 0.2)
sunLight2.position.set(-500, 500, -500)
scene.add(sunLight2);

const reflectionLight = new THREE.AmbientLight(0x404040)
scene.add(reflectionLight);

function animate(){
    requestAnimationFrame(animate);
    //console.log(controls.moveForward);
    controls.update();
    //fly.update();
    //pointLock.lock();
    //chunk.Render();
    //console.log(camera);
    chunkManager.Update(1, camera.position, scene);
    renderer.render(scene, camera);

    stats.update();
}
animate();