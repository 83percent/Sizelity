import Cookie from './Cookie';

export default class Login {
    constructor() {
        this.cookie = new Cookie();
        this.cookieName = "sizelity_user";
    }
    isLogin() { // Login 여부 확인
        return Boolean;
    }
    asyncGet() {

    }
    get() {
        const data = this.cookie.get(this.cookieName);
        return data;
        /* if(!data && this.__valid(data)) return null;
        try {
            const response = await this.__getServerLoginInfo(data.id, data.password);
            return response;
        } catch(error) {
            return null;
        } */
    }
    /*
        set(data)
        - Set Cookie in try and success login user data
        @param userData : success user login data
    */
    set(data) {this.cookie.set(this.cookieName, data);}
    // Test Case
    __sample() {return this.cookie.userInit();}
    logout() {this.cookie.remove(this.cookieName);}
    setInfo() {
        this.info = {};
    }
    getInfo() {
        return;
    }
    async send(id, password) {
        if(!this.__checkID(id) || !this.__checkPW(password)) {
            // 유효한 아이디, 비밀번호 아님. -> 서버로 전송 안할거임.
            return null;
        }
        const userJson = await this.__getServerLoginInfo(id, password);
        try {
            let userObj = JSON.parse(userJson);
            console.log("User Object : ", userObj);
            if(this.__value(userObj)) {
                this.set(userObj);
                return userObj;
            } else {
                return null;
            }
        } catch(e) {
            return null;
        }
    }
    
    __getServerLoginInfo(id, password) {
        // 로그인 로직을 돌려서 로그인 결과를 저장하고 리턴함
        // 로그인할 시 서버에서의 결과를 가져오는 과정을 표현하기 위해 setTimeout 을 통해 지연시킨뒤 리턴
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let sampleUserJSON = JSON.stringify(sample);
                resolve(sampleUserJSON);
            },2000);
        });
    }
    __checkID() {
        // 정규표현식으로 ID의 패턴이 맞는지 확인
        return true;
    }
    __checkPW() {
        // 비밀번호 정규표현시긍로 확인
        return true;
    }
    /*
        __valid(data)
        - check user login data
    */
    __valid(data) {
        try {
            const ucode = data.ucode;
            if(ucode.constructor !== String || ucode.length !== 8) return false;
            const _c = ucode.splite("").map(s => s.charCodeAt(0));
            if(!_c[0] === 85) return false;
            if(!(_c[1] > 64 && _c[1] < 91)) return false;
            if(!(_c[2] > 64 && _c[2] < 91)) return false;

            let result = true;
            for(let i=3; i < _c.length; ++i) {
                if(!(_c[i] > 47 && _c[i] < 58)) {
                    result = false;
                    break;
                }
            }
            result = (data.id.length > 13 && data.password.length === 64 && data.name.length > 2);
            if(!result) this.logout();
            return result;
        } catch(error) {
            this.logout();
            return false;
        }
    }
}
/*
----------- userJson -----------
로그인 정보가 담김 mongoDB JSON 데이터
{
    code : string,
    id : string, // U + A-Z + nummber 000000 (length 6)
    password : string,
    name : "string"
    reg_date : string
}
*/
// Sample Data
const sample = {
    ucode : "UAA00001",
    id : "hoonni2709@naver.com",
    password : "0SADF91820183%1&13%231FQ!@3qFEAFSFD!23AFasdf!asdf41Adsfa11111111",
    name : "이재훈",
    reg_date : "2021-02-04 18:42:00"
}