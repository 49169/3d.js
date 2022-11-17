import * as THREE from 'three';
import Block from '/src/block.js';
import {BlockType} from '/src/block.js';
//import Noise from 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.js';
import {createNoise2D} from 'https://cdn.skypack.dev/simplex-noise';

export default class Chunk {
    constructor(){
      
    }
    BLOCK_RENDER_SIZE =0.5;
    //x; y; z;
    chunkY;
    Update(dt){}
    m_pBlocks = [];
    loaded;
    geometry;
    mesh;
    vertices = [];
    normals = [];
    uv = [];
    CHUNK_SIZE = 16;
    IsLoaded(){return this.loaded;}

    LoadChunk(){ // Create the blocks
      
      this.m_pBlocks = [];
      for (var i = 0; i < this.CHUNK_SIZE; i++) {
          this.m_pBlocks[i] = [];
          for (var j = 0; j < this.CHUNK_SIZE; j++) {
            //this.m_pBlocks[i][j] = new Array(this.CHUNK_SIZE).fill(new Block());
            this.m_pBlocks[i][j] = [];
            for(var k = 0; k< this.CHUNK_SIZE; k++){
              this.m_pBlocks[i][j][k] = new Block();
              this.m_pBlocks[i][j][k].SetActive(false);
            }
          };
      };
      //console.log("Loaded Chunk");
      //console.log(this.m_pBlocks[0][0]);
    };
    UnloadChunk() { // Delete the blocks
      for (let i = 0; i < CHUNK_SIZE; ++i) {
          for (let j = 0; j < CHUNK_SIZE; ++j) {
              delete[].push(m_pBlocks[i][j]);
          }
          delete[].push(m_pBlocks[i]);
      }
      delete[].push(m_pBlocks);
    }
    CreateMesh() {
      //m_pRenderer->CreateMesh(&m_meshID, OGLMeshType_Colour);
      var CHUNK_SIZE = this.CHUNK_SIZE;
      this.geometry = new THREE.BufferGeometry();
      
      //var  cube = new THREE.Mesh(geometry,material);
      //console.log(this.m_pBlocks[0][0][0].IsActive());
      var lDefault = false;
      
      for (var x = 0; x < CHUNK_SIZE; x++) {
        for (var y = 0; y < CHUNK_SIZE; y++) {
          for (var z = 0; z < CHUNK_SIZE; z++) {
            if (this.m_pBlocks[x][y][z].IsActive() == false) { // Don't create triangle data for inactive blocks
              //continue;
            }
            else{
              var lXNegative = lDefault;
              if (x > 0) {lXNegative = this.m_pBlocks[x - 1][y][z].IsActive()};
              //if(x == 0){ }
              var lXPositive = lDefault;
              if (x < CHUNK_SIZE - 1){lXPositive = this.m_pBlocks[x + 1][y][z].IsActive()};

              var lYNegative = lDefault;
              if (y > 0) {lYNegative = this.m_pBlocks[x][y - 1][z].IsActive()};

              var lYPositive = lDefault;
              if (y < CHUNK_SIZE - 1){ lYPositive = this.m_pBlocks[x][y + 1][z].IsActive()};

              var lZNegative = lDefault;
              if (z > 0){ lZNegative = this.m_pBlocks[x][y][z - 1].IsActive()};

              var lZPositive = lDefault;
              if (z < CHUNK_SIZE - 1){lZPositive = this.m_pBlocks[x][y][z + 1].IsActive()};
              //lYPositive= false;
              //console.log(lXNegative, lXPositive, lYNegative, lYPositive, lZNegative, lZPositive);
              if(y ==0){
                //console.log(lYNegative, lYPositive);
              }
              else if(y == 9){
                //console.log(lXNegative, lXPositive);
                //lXPositive = true;
              }
              //lYPositive = true;
              //lYNegative = true;
              this.CreateCube(x,y,z, lXNegative, lXPositive, lYNegative, lYPositive, lZNegative, lZPositive);
              //this.CreateCube(x,y,z, false, false, false, false, false, false);
            }
            
          }
        }
      }
      //console.log(this.vertices)
      //console.log(this.m_pBlocks);
      //m_pRenderer->FinishMesh(m_meshID, -1, m_pChunkManager->GetMaterialID());
    }
    CreateCube(x,y,z, lXNegative, lXPositive, lYNegative, lYPositive, lZNegative, lZPositive){
        var p1 = new THREE.Vector3(x - this.BLOCK_RENDER_SIZE, y - this.BLOCK_RENDER_SIZE, z + this.BLOCK_RENDER_SIZE);
        var p2 = new THREE.Vector3(x + this.BLOCK_RENDER_SIZE, y - this.BLOCK_RENDER_SIZE, z + this.BLOCK_RENDER_SIZE);
        var p3 = new THREE.Vector3(x + this.BLOCK_RENDER_SIZE, y + this.BLOCK_RENDER_SIZE, z + this.BLOCK_RENDER_SIZE);
        var p4 = new THREE.Vector3(x - this.BLOCK_RENDER_SIZE, y + this.BLOCK_RENDER_SIZE, z + this.BLOCK_RENDER_SIZE);
        var p5 = new THREE.Vector3(x + this.BLOCK_RENDER_SIZE, y - this.BLOCK_RENDER_SIZE, z - this.BLOCK_RENDER_SIZE);
        var p6 = new THREE.Vector3(x - this.BLOCK_RENDER_SIZE, y - this.BLOCK_RENDER_SIZE, z - this.BLOCK_RENDER_SIZE);
        var p7 = new THREE.Vector3(x - this.BLOCK_RENDER_SIZE, y + this.BLOCK_RENDER_SIZE, z - this.BLOCK_RENDER_SIZE);
        var p8 = new THREE.Vector3(x + this.BLOCK_RENDER_SIZE, y + this.BLOCK_RENDER_SIZE, z - this.BLOCK_RENDER_SIZE);
    
        var n1;
        var v1;
        var v2; 
        var v3;
        var v4;
        var v5;
        var v6;
        var v7;
        var v8;
        var r = 1.0;
        var g = 1.0;
        var b = 1.0;
        var a = 1.0; 
        
        // Front
        n1 = new THREE.Vector3(0.0 , 0.0 , 1.0);
        if(!lZPositive){
          
          v1 = (p1);
          v2 = (p2);
          v3 = (p3);
          v4 = (p4);
          for(var i = 0; i<6; i++){this.normals.push(n1);}
          this.vertices.push(v1);
          this.vertices.push(v2);
          this.vertices.push(v3);

          this.vertices.push(v1);
          this.vertices.push(v3);
          this.vertices.push(v4);
        } 
        //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v2, v3);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v3, v4); 

        // Back 
        n1 = new THREE.Vector3(0.0 , 0.0 , -1.0 );
        if(!lZNegative){
          
          v5 = (p5);
          v6 = (p6);
          v7 = (p7);
          v8 = (p8);
          for(var i = 0; i<6; i++){this.normals.push(n1);}
          this.vertices.push(v5);
          this.vertices.push(v6);
          this.vertices.push(v7);

          this.vertices.push(v5);
          this.vertices.push(v7);
          this.vertices.push(v8);
        }   
        //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v6, v7);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v7, v8); 

        // Right
        if(!lXPositive){
          n1 = new THREE.Vector3(1.0, 0.0, 0.0);
          v2 = (p2);
          v5 = (p5);
          v8 = (p8);
          v3 = (p3);
          for(var i = 0; i<6; i++){this.normals.push(n1)};
          this.vertices.push(v2);
          this.vertices.push(v5);
          this.vertices.push(v8);

          this.vertices.push(v2);
          this.vertices.push(v8);
          this.vertices.push(v3);
        }  
        
        //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v5, v8);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v8, v3); 

        // left
        n1 = new THREE.Vector3(-1.0, 0.0, 0.0);
        if(!lXNegative){
          
          v6 =(p6);
          v1 = (p1);
          v4 = (p4);
          v7 = (p7);
          for(var i = 0; i<6; i++){this.normals.push(n1);}
          this.vertices.push(v6);
          this.vertices.push(v1);
          this.vertices.push(v4);

          this.vertices.push(v6);
          this.vertices.push(v4);
          this.vertices.push(v7);
        }    
        
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v1, v4);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v4, v7); 

        // Top
        n1 = new THREE.Vector3(0.0 , 1.0 , 0.0 );
        if(!lYPositive){
          
          v4 = (p4);
          v3 = (p3);
          v8 = (p8);
          v7 = (p7);
          for(var i = 0; i<6; i++){this.normals.push(n1);}
          this.vertices.push(v4);
          this.vertices.push(v3);
          this.vertices.push(v8);

          this.vertices.push(v4);
          this.vertices.push(v8);
          this.vertices.push(v7);
        }  
        // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v3, v8);
        // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v8, v7); 

        // Bottom
        n1 = new THREE.Vector3(0.0 , -1.0 , 0.0 );
        if(!lYNegative){
          
          v6 = (p6);
          v5 = (p5);
          v2 = (p2);
          v1 = (p1);
          for(var i = 0; i<6; i++){this.normals.push(n1);}
          this.vertices.push(v6);
          this.vertices.push(v5);
          this.vertices.push(v2);

          this.vertices.push(v6);
          this.vertices.push(v2);
          this.vertices.push(v1);
        }
        
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v5, v2);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v2, v1);
    }
    
    Render(){
      const loader = new THREE.TextureLoader();
      const texture = loader.load('/assets/spreadsheet_tiles.png');
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;

      this.newVertices = [];
      this.newNormals = [];
      for(let i = 0; i<this.vertices.length; i++){
          //console.log(this.vertices[i]);
          this.newVertices.push(this.vertices[i].x);
          this.newVertices.push(this.vertices[i].y);
          this.newVertices.push(this.vertices[i].z);
      }
      for(var i =0; i<this.normals.length; i++){
        this.newNormals.push(this.normals[i].x);
        this.newNormals.push(this.normals[i].y);
        this.newNormals.push(this.normals[i].z);
      }
      //console.log(this.newVertices);
      this.newVertices = new Float32Array(this.newVertices);
      this.newNormals = new Float32Array(this.newNormals);
      //console.log(this.newVertices);
      this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.newVertices, 3 ) );
      this.geometry.setAttribute( 'normal', new THREE.BufferAttribute(this.newNormals, 3));

      //const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
      const material = new THREE.MeshToonMaterial({map: texture})
      const wireframe = new THREE.WireframeGeometry( this.geometry );

      const line = new THREE.LineSegments( wireframe );
      line.material.depthTest = false;
      line.material.opacity = 0.25;
      line.material.transparent = true;
      this.mesh = new THREE.Mesh( this.geometry, material );
     // this.mesh = line;
    }
    Setup_Sphere() {
      var CHUNK_SIZE = this.CHUNK_SIZE;
      for (var x = 0; x < CHUNK_SIZE; x++) {
        for (var y = 0; y < CHUNK_SIZE; y++) {
          for (var z = 0; z < CHUNK_SIZE; z++) {
            if (Math.sqrt(
              (x - (CHUNK_SIZE / 2)) * (x - (CHUNK_SIZE / 2))+
              (y - (CHUNK_SIZE / 2)) * (y - (CHUNK_SIZE / 2))+
              (z - (CHUNK_SIZE / 2)) * (z - (CHUNK_SIZE / 2))
              ) <= CHUNK_SIZE / 2) {
                
              this.m_pBlocks[x][y][z].SetActive(true);
            }
            //console.log(z);
          }
        }
      }
    }
    
    Setup_Landscape() {
      const simplex = new createNoise2D();
      //Texture * heightTexture = m_pRenderer -> GetTexture(m_pChunkManager -> GetHeightMapTexture());
      for (var x = 0; x < this.CHUNK_SIZE; x++) {
        for (var z = 0; z < this.CHUNK_SIZE; z++) { // Use the noise library to get the height value of x, z             
          //float height = m_pChunkManager->GetNoiseValue(x, z);              
          // Use the height map texture to get the height value of x, z  
          //var height = (simplex(x/16, z/16) * (this.CHUNK_SIZE - 1) * 1.0 ) * 1.0;
          var height = 5;
          for (var y = 0; y < height; y++) {
            //console.log(y);
            this.m_pBlocks[x][y][z].SetActive(true);
            //this.m_pBlocks[x][y][z].SetBlockType(BlockType_Grass);
          }
        }
      }
    }
    //1 Chunk is 16x16
    //Send 4x4 heightmap
    //Divide heightmap by 4

    Setup_Landscape2(xBound, zBound, simplex){
      var incr = zBound/16;
      for (var x = 0; x < this.CHUNK_SIZE; x++) {
        
        for (var z = 0; z < this.CHUNK_SIZE; z++) { // Use the noise library to get the height value of x, z                       
          // Use the height map texture to get the height value of x, z  
          
          var height = ((simplex( (x/128)+(xBound), (z/128)+(zBound) )+1) * (this.CHUNK_SIZE - 1) * 1.0 );
          //console.log(height);
          for (var y = 0; y < this.CHUNK_SIZE; y++) {
            //var height = ((simplex( (x/64)+(xBound), (z/64)+(zBound) )+1) * (this.CHUNK_SIZE - 1) * 1.0 );
            //console.log(this.chunkY+y);
            if(this.chunkY+y < height){
              //console.log(this.y+y);
              this.m_pBlocks[x][y][z].SetActive(true);
              this.m_pBlocks[x][y][z].SetBlockType(BlockType.BlockType_Grass);
            }
            
          }
        }
      }
      //console.log(BlockType);
    }
};



  



