/*
    $ Singleton class
*/


class Cookie {
    constructor() {
        if(this._instance) return this._instance;
        this._instance = this;
    }
    /*
        get(cname)
        - Set cookie from client browser
        @param cname : What would find name of cookie.
    */
    get(cname) {
        if(!this.__cnameRule(cname)) return null;
        try {
            const name = cname + "=";
            const decodedCookie = document.cookie;
            const ca = decodedCookie.split(';');
            for(let c of ca) {
                while (c.charAt(0) === ' ') { c = c.substring(1); }
                if (c.indexOf(name) === 0) {
                    const cookie = c.substring(name.length, c.length);
                    return JSON.parse(cookie);
                }
            }
        } catch(error) {return null;}
    } // get()

    /*
        set(cname, data, _expires)
        - Get cookie from client br owser
        @param cname = cookie name
        @param data = insert data
        @param _expires = cookie _expires (default 500)
        
    */
    set(cname, data, _expires) {
        if(!this.__cnameRule(cname)) return false;
        const d = new Date();
        if(_expires === undefined) d.setTime(d.getTime() + (500 * 24 * 60 * 60 * 1000)); 
        else d.setTime(d.getTime() + (_expires * 24 * 60 * 60 * 1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + JSON.stringify(data) + ";" + expires + ";path=/";
        return data;
    }
    remove(cname) {
        if(!this.__cnameRule(cname)) return false;
        return this.set(cname," ",0);
    } // set()
    /*
        __cnameRule(cname)
        - Check of valid Cookie inner 'Sizelity' service.
        @param cname = Want check valid cookie name.
    */
    __cnameRule(cname) {
        const _valid = [
            "sizelity_currentSearchData", // current search result list data (max-length 20)
            "sizelity_myRecently", // Recently select my product
            "sizelity_user" // user login information 
        ];
        return !(_valid.indexOf(cname) === -1);
    }

    // sample - setting init data
    userInit() {
        const user = {
            ucode : "UAA00001",
            id : "hoonni2709@naver.com",
            password : "0SADF91820183%1&13%231FQ!@3qFEAFSFD!23AFasdf!asdf41Adsfa",
            name : "이재훈",
            reg_date : "2021-02-22"
        }
        return this.set("sizelity_user",user)
    }
}

export default Cookie;