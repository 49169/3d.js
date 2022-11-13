import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.module.js';
class Chunk {
    constructor(){

    };
    Update(dt);
    Render(){
        //OpenGLRenderer * pRenderer
    };
    CHUNK_SIZE = 16;
    //Block data
    #m_pBlocks;
};

  
    
function LoadChunk(){ // Create the blocks
    //m_pBlocks = new Block **[CHUNK_SIZE];
   // for (let i = 0; i < CHUNK_SIZE; i++) {
        //m_pBlocks[i] = new Block *[CHUNK_SIZE];
        //for (let j = 0; j < CHUNK_SIZE; j++) {
        //    m_pBlocks[i][j] = new Block[CHUNK_SIZE];
        //};
    //};
};

  
function UnloadChunk() { // Delete the blocks
    for (let i = 0; i < CHUNK_SIZE; ++i) {
        for (let j = 0; j < CHUNK_SIZE; ++j) {
            delete[].push(m_pBlocks[i][j]);
        }
        delete[].push(m_pBlocks[i]);
    }
    delete[].push(m_pBlocks);
}

function CreateMesh() {
    //m_pRenderer->CreateMesh(&m_meshID, OGLMeshType_Colour);
    var geometry = new THREE.BoxGeometry(1,1,1);
    var  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var  cube = new THREE.Mesh(geometry,material);
    
    for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let y = 0; y < CHUNK_SIZE; y++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {
                if (m_pBlocks[x][y][z].IsActive() == false) { // Don't create triangle data for inactive blocks
                continue;
            }
            CreateCube();
        }
     }
    }
    m_pRenderer->FinishMesh(m_meshID, -1, m_pChunkManager->GetMaterialID());
}