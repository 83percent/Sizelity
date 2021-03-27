import axios from 'axios';

//const URL = "http://192.168.11.2:3001/user/signin";
const __server = "http://localhost:3001";
//const URL = "http://172.30.1.31:3001/user/signin";
//const URL = "https://13.124.51.75:3001/user/signin";
//const URL = "https://svjoemqvtl.execute-api.ap-northeast-2.amazonaws.com/user"; // gateway
//const URL = "https://toe8rj14gc.execute-api.ap-northeast-2.amazonaws.com/user";

export default class Login {
    async request(username, password) {
        if(!username || !password) {return null;}
        const response = await axios({
            headers : {
                'Content-Type' : 'application/json'
            },
            method: 'post',
            url: __server + '/user',
            data: {username, password},
            withCredentials: true,
            timeout: 3000
        }).catch(err=> {
            switch(err.response.status) {
                case 401 : {
                    return {data:{status:404}};
                }    
                default : {
                    return {data:{status:-200}};
                }
            }
        }); // catch
        console.log(response)
        if(response.data.status === undefined && response.data._id === undefined) return {status:-200};
        else {
            localStorage.setItem('authWithSizelity',JSON.stringify({_id: response.data._id, username: response.data.uid, name: response.data.name ,password: response.data.password}));
            sessionStorage.setItem('auth',JSON.stringify({_id: response.data._id, name: response.data.name}));
            return {_id: response.data._id, name: response.data.name};
        }
    }
    // localStorage에 저장된 정보를 갖고 로그인 시도
    async autoAuth() {
        // 1. 한시간안에 접속 기록을 확인하는 idToken : expires 1hour
        if(!localStorage.getItem("authWithSizelity")) {return null;}
        const {username, name, password} = JSON.parse(localStorage.getItem("authWithSizelity"));
        if(!username || !name ||!password) return null;
        try {
            const response = await axios({
                method: "POST",
                url: __server + '/user',
                data: {username, password},
                withCredentials: true,
                timeout: 3000
            }).catch(() => null);
            if(response.data) {
                sessionStorage.setItem('auth',JSON.stringify({_id: response.data._id, name: response.data.name}));
                return response.data;
            }
        } catch {
            return null;
        }
    }
    async delete() {
        sessionStorage.removeItem("auth");
        localStorage.removeItem("authWithSizelity");
        console.log("로그아웃 시도");
        const logout = await axios({
            method: 'GET',
            url: __server+'/user/logout',
            timeout: 3000
        }).catch(err=> {
            console.log(err);
        });
        console.log(logout);
        return logout.data;
    }
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
