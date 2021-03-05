import axios from 'axios';
import Cookie from './Cookie';

const URL = "http://localhost:3001/user/signin";
//const URL = "http://172.30.1.31:3001/user/signin";

export default class Login {
    constructor() {
        this.cookie = new Cookie();
        this.cookieName = "sizelity_user";
    }
    async get() {
        const data = this.cookie.get(this.cookieName);
        if(!data) return null;
        const result = await axios({
            method : 'post',
            url : URL,
            data : {
                _id : data.id,
                upwd : data.sili_p
            }
        });

        return (result.data.name === data.name) ? data : null;
        
    }
    logout() {this.cookie.remove(this.cookieName);}
    async send(loginObject) {
        console.log(loginObject);
        if((loginObject.uid || loginObject._id) && (loginObject.upwd || loginObject.sili_p)) {
            // 1. uid & sili_p : 신규로그인
            // 2. _id & sili_p : auto login
            try {
                const {data} = await this.__connect(loginObject);
                console.log("%cResponse Login Result Data : ","background: orange; color: #fff;", data);
                if(data.status) {
                    // 로그인 실패.
                    return data;
                } else if(data.name) {
                    if(loginObject._id) {
                        return true;
                    } else {
                        const __cookie = {
                            _id : data._id,
                            name : data.name,
                            sili_p : data.upwd
                        }
                        return __cookie;
                    }
                } else {
                    return {status : -200};
                }
            } catch {
                return {status : -200};
            }
        } else {
            // 전송할 로그인 데이터가 형식에 맞지 않음
            return false;
        }
    } //  async send()
    
    __connect(loginObject) {
        console.log(loginObject);
        // 로그인 로직을 돌려서 로그인 결과를 저장하고 리턴함
        // 로그인할 시 서버에서의 결과를 가져오는 과정을 표현하기 위해 setTimeout 을 통해 지연시킨뒤 리턴
        return new Promise(resolve => {
            const result = axios({
                method : 'post',
                url : URL,
                data : loginObject,
                timeout: 3000
            });
            
            resolve(result);
        });
    } // __connect()
}
/*
----------- Response userJson -----------
로그인 정보가 담김 mongoDB Object 데이터
{
    _id : "string",
    uid : "string", (email)
    upwd : "string",
    name : "string",
    gender : "string", [not, male, female]
    alert : boolean,
    privacy : boolean
    reg_date : "string"
}
*/