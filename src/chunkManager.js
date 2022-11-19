import Chunk from '/src/chunk.js';
import {createNoise2D} from 'https://cdn.skypack.dev/simplex-noise';
export default class ChunkManager{
    m_cameraPosition;
    m_cameraView;
    m_vpChunkLoadList = [];
    m_forceVisibilityUpdate;
    m_pChunks = [];
    CHUNK_SIZE = 16;
    WORLD_SIZE = 64;
    simplex = new createNoise2D();

    init(){
        //simplex = new createNoise2D();
        var noiseMap = [];
        for(var i = 0; i< 10; i++){
            for(var j = 0; j<10;j++){
                for(var x = 0; x<this.CHUNK_SIZE; x++){
                    for(var y = 0; y<this.CHUNK_SIZE; y++){
                        //noiseMap.push(simplex(((x/128)+ ((i+1)/8)), (y/128)+(j+1)/8));
                    }
                }
            }
        }
        for(var i = 0; i< 5; i++){
            this.m_pChunks[i]  = []
            for(var j = 0; j<5;j++){
                this.m_pChunks[i][j]  = []
                for(var k = 0; k<3;k++){
                    var newChunk = new Chunk();
                    newChunk.chunkY = (k)*16;
                    //console.log(newChunk.chunkY);
                    newChunk.LoadChunk();
                    //newChunk.Setup_Landscape();
                    //newChunk.m_pBlocks[0][0][0].SetActive(true);
                    //newChunk.m_pBlocks[1][0][0].SetActive(true);
                    //newChunk.Setup_Sphere();
                    newChunk.Setup_Landscape2(((i+1)/8),((j+1)/8),this.simplex);
                    
                    newChunk.CreateMesh();
                    newChunk.Render();
                    this.m_pChunks[i][j][k] = newChunk;
                }
            }
        }
    }

    Update(dt , cameraPosition, scene){
        this.UpdateLoadList();
        //console.log(this.m_pChunks);
        //UpdateSetupList();
        //UpdateRebuildList();
        //UpdateUnloadList();
        //console.log(cameraPosition);
        //console.log(this.m_pChunks[0][0]);
        var camX = Math.floor((cameraPosition.x + this.WORLD_SIZE/2)/16);
        var camZ = Math.floor((cameraPosition.z + this.WORLD_SIZE/2)/16);
        //console.log(camX + ", " + camZ);
        console.log(cameraPosition);
        //console.log(this.m_pChunks[22]);
        if(camX <= this.WORLD_SIZE){
            if(this.m_pChunks[camX] == null){
                console.log("here: " + camX);
                this.m_pChunks[camX] = [];
            }
        }
        if(camZ <= this.WORLD_SIZE){
            if(this.m_pChunks[camX][camZ]==null){
                //for(var j = 0; j<1;j++){
                    this.m_pChunks[camX][camZ]  = []
                    for(var k = 0; k<3;k++){
                        var newChunk = new Chunk();
                        newChunk.chunkY = (k)*16;
                        //console.log(newChunk.chunkY);
                        newChunk.LoadChunk();
                        //newChunk.Setup_Landscape();
                        //newChunk.m_pBlocks[0][0][0].SetActive(true);
                        //newChunk.m_pBlocks[1][0][0].SetActive(true);
                        //newChunk.Setup_Sphere();
                        newChunk.Setup_Landscape2(((camX+1)/8),((camZ+1)/8),this.simplex);
                        
                        newChunk.CreateMesh();
                        newChunk.Render();
                        newChunk.mesh.position.set((camX-2)*16,(k-2)*16,(camZ-2)*16);
                        
                        scene.add(newChunk.mesh);
                        this.m_pChunks[camX][camZ][k] = newChunk;
                    }
                //}
            }
        }
        
        //if (this.m_cameraPosition != cameraPosition || this.m_cameraView != cameraView) {
           // UpdateRenderList();
        //}
        this.m_cameraPosition = cameraPosition;
        //this.m_cameraView = cameraView;
    }

    UpdateLoadList(){
        var lNumOfChunksLoaded = 0;
        var ASYNC_NUM_CHUNKS_PER_FRAME = 1;
        for(var i = 0; i<this.m_vpChunkLoadList.length; i++){
            //Chunk * pChunk = ( * iterator);
            pChunk = this.m_vpChunkLoadList[i];
            if (pChunk.IsLoaded() == false) {
                if (lNumOfChunksLoaded != ASYNC_NUM_CHUNKS_PER_FRAME) {
                    pChunk.LoadChunk(); // Increase the chunks loaded count
                    lNumOfChunksLoaded++;
                    m_forceVisibilityUpdate = true;
                }
            }
        }
        // Clear the load list (every frame)     
        this.m_vpChunkLoadList = [];
    }

    UpdateSetupList() { // Setup any chunks that have not already been setup     
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

    UpdateRebuildList() {
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
    UpdateUnloadList() { // Unload any chunks
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

    UpdateRenderList() {
        // Clear the render list each frame BEFORE we do our tests to see what chunks should be rendered     
        m_vpChunkRenderList.clear();
        //ChunkList::iterator iterator;
        for (var i =0; i<m_vpChunkVisibilityList.length; i++) {
        //Chunk * pChunk = ( * iterator);
        if (pChunk != NULL) {
            if (pChunk.IsLoaded() && pChunk.IsSetup()) {
            if (pChunk.ShouldRender()) // Early flags check so we don't always have to do the frustum check... 
            {// Check if this chunk is inside the camera frustum                    
                c_offset = (Chunk.CHUNK_SIZE * this.BLOCK_RENDER_SIZE) - this.BLOCK_RENDER_SIZE;
                chunkCenter = pChunk.GetPosition() + Vector3(c_offset, c_offset, c_offset);
                c_size = Chunk.CHUNK_SIZE * this.BLOCK_RENDER_SIZE;
                if (m_pRenderer.CubeInFrustum(m_pRenderer.GetActiveViewPort(), chunkCenter, c_size, c_size, c_size)) {
                m_vpChunkRenderList.push_back(pChunk);
                }
            }
            }
        }
        }
    }
}

