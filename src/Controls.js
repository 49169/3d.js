import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import * as THREE from 'three';

export default class Controls{
    constructor(camera, domElement, document){
        this.camera = camera;
        this.domElement =domElement
        this.document = document;

        //let moveForward = false; let moveBackward = false; let moveLeft = false; let moveRight = false; let canJump = false;
        //this.moveForward = moveForward;
        this.init();
        //this.controls = new PointerLockControls(this.camera, this.domElement);
    }
    camera; domElement;document; controls; prevTime = performance.now();
    //Movement Controls
    
    velocity = new THREE.Vector3();
	direction = new THREE.Vector3();
	vertex = new THREE.Vector3();
	color = new THREE.Color();
    init(){

        const instructions = this.document.getElementById( 'instructions' );
        const controls = new PointerLockControls(this.camera, this.domElement)
        this.controls = controls;
        
       
        const mouseLock = function(){
            
            controls.lock();
            
            console.log("click");
        }
        this.document.addEventListener( 'keydown',(event)=>{
            switch ( event.code ) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    //onsole.log(this.moveForward);
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
                    if ( this.canJump === true ) this.velocity.y += 350;
                    this.canJump = false;
                    break;
                case 'KeyE':
                    //console.log("here");
                    this.moveDown = true;
                    break;
                case 'KeyQ':
                    this.moveUp = true;
                    break;
            }
        });
        this.document.addEventListener( 'keyup', (event)=>{
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
                case 'KeyE':
                    this.moveDown = false;
                    break;
                case 'KeyQ':
                    this.moveUp = false;
                    break;
            }
        });
        this.document.addEventListener( 'click', mouseLock);
        //this.controls.isLocked = true;
    }
    
    update(){
        const time = performance.now();
        //const forward = this.moveForward;
        //console.log(this.moveForward);
        if ( this.controls.isLocked === true ) {
            
            const delta = ( time - this.prevTime ) / 1000;
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= this.velocity.y * 10.0 * delta; // 100.0 = mass
            var forward = this.moveForward ? 1:0;
            var backward = this.moveBackward ? -1:0;
            var left = this.moveLeft? -1:0;
            var right = this.moveRight ? 1:0;
            //console.log(this.moveDown);
            var down = this.moveDown? -1:0;
            //console.log(down);
            var up = this.moveUp? 1:0;
            //console.log(up);
            this.direction.z = forward + backward;
            this.direction.x = left + right;
            this.direction.y = up + down;

            //console.log(this.direction);
            this.direction.normalize(); // this ensures consistent movements in all directions
            if ( this.moveForward || this.moveBackward ){
                this.velocity.z -= this.direction.z * 400.0 * delta;
            } 
            //console.log(this.moveDown)
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 400.0 * delta;
            if( this.moveUp || this.moveDown ) this.velocity.y -= this.direction.y * 400.0 * delta;
            //console.log(this.controls.getObject().position);
            this.controls.moveRight( - this.velocity.x * delta );
            this.controls.moveForward( - this.velocity.z * delta );
            //this.controls.moveDown(-this.velocity.y*delta);
            this.controls.getObject().position.y += ( this.velocity.y * delta ); // new behavior

            
        }
        this.prevTime = time;
    }
}