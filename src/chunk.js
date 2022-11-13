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
    geometry;
    vertices = [];
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
    this.geometry = new THREE.BufferGeometry();
    var  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //var  cube = new THREE.Mesh(geometry,material);
    
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
    //m_pRenderer->FinishMesh(m_meshID, -1, m_pChunkManager->GetMaterialID());
}
function CreateCube(){
    p1 = new THREE.Vector3d(x - Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
    p2 = new THREE.Vector3d (x + Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
    p3 = new THREE.Vector3d(x + Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
    p4 = new THREE.Vector3d(x - Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z + Block.BLOCK_RENDER_SIZE);
    p5 = new THREE.Vector3d(x + Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
    p6 = new THREE.Vector3d(x - Block.BLOCK_RENDER_SIZE, y - Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
    p7 = new THREE.Vector3d(x - Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);
    p8 = new THREE.Vector3d(x + Block.BLOCK_RENDER_SIZE, y + Block.BLOCK_RENDER_SIZE, z - Block.BLOCK_RENDER_SIZE);

    n1;
    v1;
    v2;
    v3;
    v4;
    v5;
    v6;
    v7;
    v8;
    r = 1.0;
    g = 1.0;
    b = 1.0;
    a = 1.0; // Front     
    n1 = new THREE.Vector3d(0.0 , 0.0 , 1.0 );
    v1 = vertices.push(p1 + n1);
    v2 = vertices.push(p2 + n1);
    v3 = vertices.push(p3 + n1);
    v4 = vertices.push(p4 + n1);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v2, v3);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v1, v3, v4); // Back     
    n1 = Vector3d(0.0 , 0.0 , -1.0 );
    v5 = vertices.push(p5 + n1);
    v6 = vertices.push(p6 + n1);
    v7 = vertices.push(p7 + n1);
    v8 = vertices.push(p8 + n1);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v6, v7);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v5, v7, v8); // Right     
    n1 = Vector3d(1.0, 0.0, 0.0);
    v2 = vertices.push(p2 + n1);
    v5 = vertices.push(p5 + n1);
    v8 = vertices.push(p8 + n1);
    v3 = vertices.push(p3 + n1);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v5, v8);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v2, v8, v3); // left     
    n1 = Vector3d(-1.0, 0.0, 0.0);
    v6 =vertices.push(p6 + n1);
    v1 = vertices.push(p1 + n1);
    v4 = vertices.push(p4 + n1);
    v7 = vertices.push(p7 + n1);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v1, v4);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v4, v7); // Top     
    n1 = Vector3d(0.0 , 1.0 , 0.0 );
    v4 = vertices.push(p4 + n1);
    v3 = vertices.push(p3 + n1);
    v8 = vertices.push(p8 + n1);
    v7 = vertices.push(p7 + n1);
    // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v3, v8);
    // m_pRenderer->AddTriangleToMesh(m_meshID, v4, v8, v7); // Bottom     
    n1 = Vector3d(0.0 , -1.0 , 0.0 );
    v6 = vertices.push(p6 + n1);
    v5 = vertices.push(p5 + n1);
    v2 = vertices.push(p2 + n1);
    v1 = vertices.push(p1 + n1);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v5, v2);
    //m_pRenderer->AddTriangleToMesh(m_meshID, v6, v2, v1);
}

function Render(){
    newVertices = [];
    for(let i = 0; i<24; i++){
        newVertices.push(this.vertices[i].x);
        newVertices.push(this.vertices[i].y);
        newVertices.push(this.vertices[i].z);
    }
    newVertices = new Float32Array(newVertices);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.mesh = new THREE.Mesh( geometry, material );
}