import axios from 'axios';

class Notice {
    constructor(server) {
        this.server = server;
    }

    async get() {
        return await axios({
            method: 'GET',
            url: `${this.server}/notice`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data : response.data};
            else return {type: 'error', msg: response.data?.error};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.erroor};
            else return {type: 'error', msg: '네트워크 연결을 확인하세요.'};
        })
    }
}

export default Notice;