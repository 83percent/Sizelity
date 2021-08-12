import axios from 'axios';

class Account {
    constructor(server) {
        this.server = server;
    }

    // 계정 생성
    async create() {

    }

    // 계정 로그인
    async login({username, password}) {
        return await axios({
            method : 'POST',
            url : `${this.server}/account/signin`,
            data : {
                username, password
            },
            withCredentials : true,
            timeout: 5500
        }).then(response => {

            console.log(response);

            switch(response.status) {
                case 200 : {
                    const {_id, uid, name, password} = response.data;
                    localStorage.setItem('authWithSizelity',JSON.stringify({_id, username: uid, name ,password}));
                    sessionStorage.setItem('auth',JSON.stringify({_id, name}));

                    return {type: 'success', data : response.data};
                }
                case 204 : {
                    return {type: 'error', msg : response.data.error};
                }
                default : {
                    return {type: 'error', msg: "문제가 발생했습니다."};
                }
            }
            
        }).catch(err => {
            console.log(err);
            switch(err?.response?.status) {
                case 401 : {
                    return {type: 'error', msg: "아이디 또는 비밀번호를 확인해주세요."};
                }
                case 500 : {
                    return {type : "error", msg : "잠시후 다시 시도해주세요."};
                }
                default : {
                    return {type : "error", msg : "네트워크 연결을 확인해주세요."};
                }
            }
        });
    }

    // 자동 로그인
    async autoLogin() {
        if(!localStorage.getItem("authWithSizelity")) {return null;}
        const {username, password} = JSON.parse(localStorage.getItem("authWithSizelity"));
        if(!username ||!password) return null;
        return await axios({
            method: 'POST',
            url:  `${this.server}/account/signin`,
            data: {username, password},
            withCredentials: true,
            timeout : 5500
        }).then(response => {
            if(response?.status === 200) {
                sessionStorage.setItem('auth',JSON.stringify({_id: response.data._id, name: response.data.name}));
                return {_id: response.data._id, name: response.data.name};
            }
        }).catch(err => {
            console.log(err);
            return null;
        });
    }

    // 계정 삭제
    async remove({password, option, suggest}) {
        return await axios({
            method: 'DELETE',
            url: `${this.server}/user`,
            data : {
                password, option, suggest
            },
            withCredentials : true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                sessionStorage.removeItem("auth");
                localStorage.removeItem("authWithSizelity");
                return {type : "success"}
            }
        }).catch(err => {
            if(err?.response?.status) return {type : "error", msg : err.repsonse.data.error};
            else return {type : "error", msg : "네트워크 연결을 확인해주세요."};
        });
    }

    // 계정 수정
    async patch() {

    }

    // 로그아웃
    async logout() {
        return await axios({
            method : 'GET',
            url : `${this.server}/user/logout`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                sessionStorage.removeItem("auth");
                localStorage.removeItem("authWithSizelity");
                return true;
            }
        }).catch(err => {
            console.error(err);
            return false;
        })
    }
}

export default Account;