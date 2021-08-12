import axios from 'axios';

//const URL = "http://192.168.11.2:3001/user/signin";
//const URL = "http://172.30.1.31:3001/user/signin";

const __server = "http://localhost:3001";
//const __server = "https://server.sizelity.com";

export default class Login {
    async request(username, password) {
        if(!username || !password) {return null;}
        const response = await axios({
            headers : {
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            url: __server + '/account/signin',
            data: {username, password},
            withCredentials: true,
            timeout: 3000
        }).catch(err=> {
            console.log("err : ", err.response?.status);
            if(!err.response?.status) return {data:{status:-200}};
            switch(err.response.status) {
                case 401 : {
                    return {data:{status:404}};
                }
                default : {
                    return {data:{status:-200}};    
                }
            }
        }); // catch
        if(response.data.status !== undefined) return response.data;
        else if(response.data._id === undefined) return {status:-200};
        else {
            const {_id, uid, name, password} = response.data;
            localStorage.setItem('authWithSizelity',JSON.stringify({_id, username: uid, name ,password}));
            sessionStorage.setItem('auth',JSON.stringify({_id, name}));
            return {_id, name};
        }
    }
    // localStorage에 저장된 정보를 갖고 로그인 시도
    async autoAuth() {
        if(!localStorage.getItem("authWithSizelity")) {return null;}
        const {username, password} = JSON.parse(localStorage.getItem("authWithSizelity"));
        if(!username ||!password) return null;
        try {
            const response = await axios({
                method: "POST",
                url: __server + '/account/signin',
                data: {username, password},
                withCredentials: true,
                timeout: 3000
            }).catch((err) => {
                console.log(err);
                return {data:{status:-200}};
            });
            if(response?.data) {
                sessionStorage.setItem('auth',JSON.stringify({_id: response.data._id, name: response.data.name}));
            }
            return response.data._id ? {_id: response.data._id, name: response.data.name} : response.data;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
    async delete() {
        const response = await axios({
            method: 'GET',
            url: __server+'/user/logout',
            withCredentials: true,
            timeout: 3000
        }).catch(err=> {
            console.log(err);
        });
        sessionStorage.removeItem("auth");
        localStorage.removeItem("authWithSizelity");

        if(response?.status === 200) {
            return true;
        } else {
            return false;
        }
    }
}