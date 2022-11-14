export default class Block {
    m_active = false;
    m_blockType;
    BLOCK_RENDER_SIZE = 1;
    constructor(){
        this.m_active = false;
    }
    IsActive(){
        return this.m_active;
    }
    SetActive(active){
        this.m_active = active;
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

export const BLOCK_RENDER_SIZE = 1;