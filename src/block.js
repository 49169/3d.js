export default class Block {
    m_active = false;
    m_blockType;
    BLOCK_RENDER_SIZE = 1;
    blockType;
    constructor(){
        this.m_active = false;
    }
    IsActive(){
        return this.m_active;
    }
    SetActive(active){
        this.m_active = active;
    }
    SetBlockType(type){
        this.blockType = type;
    }
};

export const BlockType ={
    BlockType_Default: 1,
    BlockType_Grass: 2,
    BlockType_Dirt: 3,
    BlockType_Water: 4,
    BlockType_Stone: 5,
    BlockType_Wood: 6,
    BlockType_Sand: 7,
    BlockType_NumTypes: 8,
};

export const BLOCK_RENDER_SIZE = 1;