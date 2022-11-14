import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunLight = new THREE.PointLight(0xffffff, 0.5);
sunLight.position.set(500, 500, 500);
scene.add(sunLight);

const sunLight2 = new THREE.PointLight(0xffffff, 0.2);
sunLight2.position.set(-500, 500, -500);
scene.add(sunLight2);

const reflectionLight = new THREE.AmbientLight(0x404040);
scene.add(reflectionLight);

camera.position.set( 0, -40, 50 );

var fly = new OrbitControls(camera, renderer.domElement);
const vertices = [
    // front
    { pos: [-1, -1,  1], norm: [ 0,  0,  -1], uv: [0, -1], },
    { pos: [ 1, -1,  1], norm: [ 0,  0,  -1], uv: [-1, -1], },
    { pos: [-1,  1,  1], norm: [ 0,  0,  -1], uv: [0, 0], },

    { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
    { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [-1, -1], },
    { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [-1, 0], },
    // right
    { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
    { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },

    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
    { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
    { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
    // back
    { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },

    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
    { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
    // left
    { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 1], },
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },

    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 0], },
    // top
    { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },

    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
    { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 0], },
    // bottom
    { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 1], },
    { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },

    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
    { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
    { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 0], },
  ];
  const positions = [];
  const normals = [];
  const uvs = [];
  for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
  };

  const geometry = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
  geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
  geometry.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/star.png');

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color, map: texture});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x88FF88,  0),
    makeInstance(geometry, 0x8888FF, -4),
    makeInstance(geometry, 0xFF8888,  4),
  ];

  function animate(){
    requestAnimationFrame(animate);
    fly.update();
    //chunk.Render();
    renderer.render(scene, camera);
    //
    //cube.rotation.x += 0.01;
    //cube.rotation.y -= 0.04;
    //console.log("here");
}
animate();