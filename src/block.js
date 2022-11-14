export default class Block {
    #m_active;
    m_blockType;
    BLOCK_RENDER_SIZE = 16;
    constructor(){

    }
    IsActive(){
        return this.m_active;
    }
    SetActive(active){
        this.active = active;
    }
};

const BlockType ={
    BlockType_Default: 0,
    BlockType_Grass: 0,
    BlockType_Dirt: 0,
    BlockType_Water: 0,
    BlockType_Stone: 0,
    BlockType_Wood: 0,
    BlockType_Sand: 0,
    BlockType_NumTypes: 0,
};

export const RENDER_SIZE = 16;