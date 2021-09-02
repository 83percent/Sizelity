import axios from 'axios';


let instance = null;
class Account {
    constructor(server) {
        if(instance) return instance;
        this.server = server;
        instance = this;
    }

    // 계정 정보 가져오기
    async getUser() {
        return await axios({
            method: 'GET',
            url: `${this.server}/user`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response?.status === 200) return {type: 'success', data : response.data};
            else return {type: 'error', msg: '서버에 문제가 발생했습니다.'};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'error', msg: '네트워크 연결을 확인하세요.'};
        });
    }

    // 자동 로그인
    async autoLogin() {
        return await axios({
            method: 'POST',
            url:  `${this.server}/auth/`,
            withCredentials: true,
            timeout : 5500
        }).then(response => {
            if(response?.status === 200) {
                return response.data;
            }
        }).catch(err => {
            console.log(err);
            return null;
        });
    }

    // 계정 삭제
    async remove(reason) {
        return await axios({
            method: 'DELETE',
            url: `${this.server}/user`,
            data : {reason},
            withCredentials : true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                localStorage.removeItem("sizelity_token");
                return {type : "success"}
            }
        }).catch(err => {
            if(err?.response?.data) return {type : "error", msg : err.response.data.error};
            else return {type : "error", msg : "네트워크 연결을 확인해주세요."};
        });
    }

    // 계정 수정
    async patch(data) {
        return await axios({
            method: 'PATCH',
            url: `${this.server}/user`,
            data : data,
            withCredentials : true,
            timeout: 5500
        }).then(response => {
            console.log(response);
            if(response.status === 200) {
                return {type : "success"};
            } else {
                return {type : "error", msg : response.data.error};
            }
        }).catch(err => {
            console.log(err);
            if(err?.response?.status) return {type : "error", msg : err.repsonse.data.error};
            else return {type : "error", msg : "네트워크 연결을 확인해주세요."};
        }); 
    }

    // 로그아웃
    async logout() {
        /* return await axios({
            method : 'GET',
            url : `${this.server}/user/logout`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                Cookies.remove('sizelity_token');
                localStorage.removeItem("sizelity_token");
                return true;
            }
        }).catch(err => {
            console.error(err);
            return false;
        }); */
        try {
            localStorage.removeItem("sizelity_token");
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
        
        
    }
}

export default Account;