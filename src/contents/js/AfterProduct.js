import axios from 'axios';
import StatusCode from './StatusCode';
class AfterProduct {
    constructor(server) {
        this.server = server;
    }
    // 불러오기
    async getList(id) {
        if(id !== undefined) return StatusCode.invalid; // invalid
        
        await axios({
            method: 'GET',
            url : `${server}/after/${id}`,
            withCredentials: true,
            timeout : 5500
        }).then(response => {
            if(response.status === 200) {
                return response.data;
            }
        }).catch(err => {
            if(err?.response?.status) return err.response.status;
            else return 0;
        })
    }

    // 저장

}

export default AfterProduct;

/*

*/