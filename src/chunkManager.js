import Chunk from '/src/chunk.js';
import {createNoise2D} from 'https://cdn.skypack.dev/simplex-noise';
export default class ChunkManager{
    m_cameraPosition;
    m_cameraView;
    m_vpChunkLoadList = [];
    m_forceVisibilityUpdate;
    m_pChunks = [];

    init(){
        const simplex = new createNoise2D();
        for(var i = 0; i< 5; i++){
            this.m_pChunks[i]  = []
            for(var j = 0; j<5;j++){
                this.m_pChunks[i][j]  = []
                for(var k = 0; k<5;k++){
                    var newChunk = new Chunk();
                    newChunk.y = (k)*16;
                    //console.log(newChunk.y);
                    newChunk.LoadChunk();
                    //newChunk.Setup_Landscape();
                    newChunk.Setup_Landscape2(((i+1)/4),((j+1)/4),simplex);
                    
                    newChunk.CreateMesh();
                    newChunk.Render();
                    this.m_pChunks[i][j][k] = newChunk;
                }
            }
        }
    }

    Update(dt , cameraPosition, cameraView){
        this.UpdateLoadList();
        //UpdateSetupList();
        //UpdateRebuildList();
        //UpdateUnloadList();
        if (this.m_cameraPosition != cameraPosition || this.m_cameraView != cameraView) {
           // UpdateRenderList();
        }
        this.m_cameraPosition = cameraPosition;
        this.m_cameraView = cameraView;
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

