class Config {
    constructor(id) {
        this.__id = id;
        this.__config = null;
    }
    
    get() {
        if(this.__config === null) {
            try {
                this.__config = JSON.parse(localStorage.getItem("sizelity_config"));

                if(this.__config.id === this.__id) return this.__config;
                else {
                    this.remove();
                    return this.init();
                }
            } catch {}
            if(this.__config === null) this.__config = this.init();
        }
        return this.__config;
    }
    init() {
        const __InitObject = {
            id : this.__id,
            manual : {
                compare : 1,
                closet : 1,
                add : 1,
                alfter : 1,
                history : 1,
                event : 1
            } // 매뉴얼 1 : 보여줘야함, 0 : 안보여줌
        }
        localStorage.setItem("sizelity_config", JSON.stringify(__InitObject));
        return __InitObject;
    }
    remove() {
        try {
            localStorage.removeItem("sizelity_config");
        } catch {}
    }
    setManualLevel(type, level) {
        if(this.__config) {
            this.__config.manual[type] = level;
            localStorage.setItem("sizelity_config", JSON.stringify(this.__config));
        } else {
            return false;
        }
    }
}

export default Config;