import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import * as THREE from 'three';

export default class Controls{
    constructor(camera, domElement, document){
        this.camera = camera;
        this.domElement =domElement
        
        this.document = document;
        //this.controls = new PointerLockControls(this.camera, this.domElement);
    }
    camera; domElement;document; controls; prevTime = performance.now();
    //Movement Controls
    moveForward = false; moveBackward = false; moveLeft = false; moveRight = false; canJump = false;
    velocity = new THREE.Vector3();
	direction = new THREE.Vector3();
	vertex = new THREE.Vector3();
	color = new THREE.Color();
    init(){
        //const blocker = document.getElementById( 'blocker' );
        const instructions = this.document.getElementById( 'instructions' );
        this.controls = new PointerLockControls(this.camera, this.domElement)
        console.log(this.controls);

        const onKeyDown = function ( event ) {
            switch ( event.code ) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    console.log("forward");
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this. moveBackward = true;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    break;
                case 'Space':
                    if ( this.canJump === true ) velocity.y += 350;
                    this.canJump = false;
                    break;
            }
        };
        const onKeyUp = function ( event ) {
            switch ( event.code ) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    break;
            }
        };
        const mouseLock = function(){
            var controls = this.controls;

            console.log(controls);
            this.controls.lock();
            console.log("click");
        }
        this.document.addEventListener( 'keydown', onKeyDown );
        this.document.addEventListener( 'keyup', onKeyUp );
        this.document.addEventListener( 'click', mouseLock);
        //this.controls.isLocked = true;
        //this.controls.lock();
    }
    update(){
        const time = performance.now();
        if ( this.controls.isLocked === true ) {
            //this.controls.lock();
            const delta = ( time - this.prevTime ) / 1000;
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
            this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
            this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
            this.direction.normalize(); // this ensures consistent movements in all directions
            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 400.0 * delta;
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 400.0 * delta;
            
            this.controls.moveRight( - this.velocity.x * delta );
            this.controls.moveForward( - this.velocity.z * delta );
            this.controls.getObject().position.y += ( this.velocity.y * delta ); // new behavior
            if ( this.controls.getObject().position.y < 10 ) {
                this.velocity.y = 0;
                this.controls.getObject().position.y = 10;
                this.canJump = true;
            }
        }
        this.prevTime = time;
    }
}