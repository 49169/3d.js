class Block {
    #m_active;
    m_blockType;

    constructor(){

    }
    get IsActive(){
        return m_active;
    }
    SetActive(active){
        this.active = active;
    }
};

const BlockType ={
    BlockType_Default: 0,
    BlockType_Grass,
    BlockType_Dirt,
    BlockType_Water,
    BlockType_Stone,
    BlockType_Wood,
    BlockType_Sand,
    BlockType_NumTypes,
};