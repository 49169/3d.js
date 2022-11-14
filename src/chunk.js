import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.module.js';
import Block from '/src/block.js';
export default class Chunk {
    constructor(){

    }
    Update(dt){}
    //Render(){
        //OpenGLRenderer * pRenderer
    //};
    CHUNK_SIZE = 16;
    //Block data
    #m_pBlocks = [];
    #loaded;
    geometry;
    vertices = [];
    CHUNK_SIZE = 16;
    get IsLoaded(){
        return this.#loaded;
    }
    LoadChunk(){ // Create the blocks
        this.m_pBlocks = [];
        for (let x = 0; x < this.CHUNK_SIZE; x++){
            this.m_pBlocks= new Array(this.CHUNK_SIZE).fill(new Block());
            for (let i = 0; i < this.CHUNK_SIZE; i++) {
                this.m_pBlocks[i] = new Array(this.CHUNK_SIZE).fill(new Block());
                for (let j = 0; j < this.CHUNK_SIZE; j++) {
                    this.m_pBlocks[i][j] = new Array(this.CHUNK_SIZE).fill(new Block());
                    
                };
            };
        }
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
        var CHUNK_SIZE = 16;
        this.geometry = new THREE.BufferGeometry();
        var  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        //var  cube = new THREE.Mesh(geometry,material);
        console.log(this.m_pBlocks[0][0][0].IsActive());
        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let y = 0; y < CHUNK_SIZE; y++) {
                for (let z = 0; z < CHUNK_SIZE; z++) {
                    if (this.m_pBlocks[x][y][z].IsActive() == false) { // Don't create triangle data for inactive blocks
                        continue;
                    }
                    this.CreateCube(x,y,z);
                }
            }
        }
        //m_pRenderer->FinishMesh(m_meshID, -1, m_pChunkManager->GetMaterialID());
    }
    CreateCube(x,y,z){
        var p1 = new THREE.Vector3(x - Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
        var p2 = new THREE.Vector3 (x + Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
        var p3 = new THREE.Vector3(x + Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
         var p4 = new THREE.Vector3(x - Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
        var p5 = new THREE.Vector3(x + Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
        var p6 = new THREE.Vector3(x - Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
        var p7 = new THREE.Vector3(x - Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
        var p8 = new THREE.Vector3(x + Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
    
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
        var a = 1.0; // Front     
        n1 = new THREE.Vector3(0.0 , 0.0 , 1.0 );
        v1 = this.vertices.push(p1 + n1);
        v2 = this.vertices.push(p2 + n1);
        v3 = this.vertices.push(p3 + n1);
        v4 = this.vertices.push(p4 + n1);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v2, v3);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v3, v4); // Back     
        n1 = new THREE.Vector3(0.0 , 0.0 , -1.0 );
        v5 = this.vertices.push(p5 + n1);
        v6 = this.vertices.push(p6 + n1);
        v7 = this.vertices.push(p7 + n1);
        v8 = this.vertices.push(p8 + n1);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v6, v7);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v7, v8); // Right     
        n1 = new THREE.Vector3(1.0, 0.0, 0.0);
        v2 = this.vertices.push(p2 + n1);
        v5 = this.vertices.push(p5 + n1);
        v8 = this.vertices.push(p8 + n1);
        v3 = this.vertices.push(p3 + n1);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v5, v8);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v8, v3); // left     
        n1 = new THREE.Vector3(-1.0, 0.0, 0.0);
        v6 =this.vertices.push(p6 + n1);
        v1 = this.vertices.push(p1 + n1);
        v4 = this.vertices.push(p4 + n1);
        v7 = this.vertices.push(p7 + n1);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v1, v4);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v4, v7); // Top     
        n1 = new THREE.Vector3(0.0 , 1.0 , 0.0 );
        v4 = this.vertices.push(p4 + n1);
        v3 = this.vertices.push(p3 + n1);
        v8 = this.vertices.push(p8 + n1);
        v7 = this.vertices.push(p7 + n1);
        // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v3, v8);
        // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v8, v7); // Bottom     
        n1 = new THREE.Vector3(0.0 , -1.0 , 0.0 );
        v6 = this.vertices.push(p6 + n1);
        v5 = this.vertices.push(p5 + n1);
        v2 = this.vertices.push(p2 + n1);
        v1 = this.vertices.push(p1 + n1);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v5, v2);
        //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v2, v1);
    }
    
    Render(){
        this.newVertices = [];
        for(let i = 0; i<24; i++){
            this.newVertices.push(this.vertices[i].x);
            this.newVertices.push(this.vertices[i].y);
            this.newVertices.push(this.vertices[i].z);
        }
        this.newVertices = new Float32Array(this.newVertices);
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.mesh = new THREE.Mesh( geometry, material );
    }
    Setup_Sphere() {
        for (var z = 0; z < CHUNK_SIZE; z++) {
          for (var y = 0; y < CHUNK_SIZE; y++) {
            for (var x = 0; x < CHUNK_SIZE; x++) {
              if (sqrt((float)(x - CHUNK_SIZE / 2) * (x - CHUNK_SIZE / 2) + (y - CHUNK_SIZE / 2) * (y - CHUNK_SIZE / 2) + (z - CHUNK_SIZE / 2) * (z - CHUNK_SIZE / 2)) <= CHUNK_SIZE / 2) {
                m_blocks[x][y][z].SetActive(true);
                m_blocks[x][y][z].SetBlockType(BlockType_Grass);
              }
            }
          }
        }
      }
};

function Update(){

}
function UpdateLoadList(){
    lNumOfChunksLoaded = 0;
    m_vpChunkLoadList = [];
    ASYNC_NUM_CHUNKS_PER_FRAME = 1;
    for(var i = 0; i<m_vpChunkLoadList.length; i++){
        //Chunk * pChunk = ( * iterator);
        if (pChunk.IsLoaded() == false) {
            if (lNumOfChunksLoaded != ASYNC_NUM_CHUNKS_PER_FRAME) {
                pChunk.LoadChunk(); // Increase the chunks loaded count
                lNumOfChunksLoaded++;
                m_forceVisibilityUpdate = true;
            }
        }
    }
    // Clear the load list (every frame)     
    m_vpChunkLoadList.clear();
}

function UpdateSetupList() { // Setup any chunks that have not already been setup     
    //ChunkList::iterator iterator;
    for (var i = 0; i< m_vpChunkSetupList.length; i++) {
      //Chunk * pChunk = ( * iterator);
        if (pChunkIsLoaded() && pChunk.IsSetup() == false) {
        pChunk.Setup();
            if (pChunk.IsSetup()) { // Only force the visibility update if we actually setup the chunk, some chunks wait in the pre-setup stage... 
            m_forceVisibilityUpdate = true;
            }
        }
    } // Clear the setup list (every frame)    
    m_vpChunkSetupList.clear();
}

function UpdateRebuildList() {
    // Rebuild any chunks that are in the rebuild chunk list     
    //ChunkList::iterator iterator;
    lNumRebuiltChunkThisFrame = 0;
    for (var i =0; i < m_vpChunkRebuildList.length && (lNumRebuiltChunkThisFrame != ASYNC_NUM_CHUNKS_PER_FRAME); i++) {
      //Chunk * pChunk = ( * iterator);
      pChunk = m_vpChunkRebuildList[i];
      if (pChunk.IsLoaded() && pChunk.IsSetup()) {
        if (lNumRebuiltChunkThisFrame != ASYNC_NUM_CHUNKS_PER_FRAME) {
          pChunk.RebuildMesh(); // If we rebuild a chunk, add it to the list of chunks that need their render flags updated                 
          // since we might now be empty or surrounded   
          m_vpChunkUpdateFlagsList.push_back(pChunk); // Also add our neighbours since they might now be surrounded too (If we have neighbours)                
          pChunkXMinus = GetChunk(pChunk.GetX() - 1, pChunk.GetY(), pChunk.GetZ());
          pChunkXPlus = GetChunk(pChunk.GetX() + 1, pChunk.GetY(), pChunk.GetZ());
          pChunkYMinus = GetChunk(pChunk.GetX(), pChunk.GetY() - 1, pChunk.GetZ());
          pChunkYPlus = GetChunk(pChunk.GetX(), pChunk.GetY() + 1, pChunk.GetZ());
          CpChunkZMinus = GetChunk(pChunk.GetX(), pChunk.GetY(), pChunk.GetZ() - 1);
          pChunkZPlus = GetChunk(pChunk.GetX(), pChunk.GetY(), pChunk.GetZ() + 1);
          if (pChunkXMinus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkXMinus);
          if (pChunkXPlus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkXPlus);
          if (pChunkYMinus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkYMinus);
          if (pChunkYPlus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkYPlus);
          if (pChunkZMinus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkZMinus);
          if (pChunkZPlus != NULL) m_vpChunkUpdateFlagsList.push_back(pChunkZPlus); // Only rebuild a certain number of chunks per frame   
          lNumRebuiltChunkThisFrame++;
          m_forceVisibilityUpdate = true;
        }
      }
    }
    // Clear the rebuild list     
    m_vpChunkRebuildList.clear();
}
function UpdateUnloadList() { // Unload any chunks
    //ChunkList::iterator iterator;
    for (var i =0; i < m_vpChunkUnloadList.length; i++) {
      //Chunk * pChunk = ( * iterator);
      if (pChunk.IsLoaded()) {
        pChunk.Unload();
        m_forceVisibilityUpdate = true;
      }
    } // Clear the unload list (every frame)    
    m_vpChunkUnloadList.clear();
}

function UpdateRenderList() {
    // Clear the render list each frame BEFORE we do our tests to see what chunks should be rendered     
    m_vpChunkRenderList.clear();
    //ChunkList::iterator iterator;
    for (var i =0; i<m_vpChunkVisibilityList.length; i++) {
      //Chunk * pChunk = ( * iterator);
      if (pChunk != NULL) {
        if (pChunk.IsLoaded() && pChunk.IsSetup()) {
          if (pChunk.ShouldRender()) // Early flags check so we don't always have to do the frustum check... 
          {// Check if this chunk is inside the camera frustum                    
            c_offset = (Chunk.CHUNK_SIZE * Block.BLOCK_RENDER_SIZE) - Block.BLOCK_RENDER_SIZE;
            chunkCenter = pChunk.GetPosition() + Vector3(c_offset, c_offset, c_offset);
            c_size = Chunk.CHUNK_SIZE * Block.BLOCK_RENDER_SIZE;
            if (m_pRenderer.CubeInFrustum(m_pRenderer.GetActiveViewPort(), chunkCenter, c_size, c_size, c_size)) {
              m_vpChunkRenderList.push_back(pChunk);
            }
          }
        }
      }
    }
}


  



