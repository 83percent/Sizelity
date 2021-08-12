/*
    2021-08-08 이재훈
*/

import axios from 'axios';
import StatusCode from './StatusCode';

/*
    사용자의 옷장 상품 핸들링
*/
class UserProduct {
    constructor(server) {
        this.server = server;
    }
    // 상품 목록 불러오기
    async get(id) {
        if(id === undefined) return StatusCode.invalid; // invalid
        return await axios({
            method: 'GET',
            url : `${this.server}/user/product/${id}`,
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
    } // get(id)

    async remove(id, productID) {
        if(id === undefined) return StatusCode.invalid; // invalid
        return await axios({
            method : 'DELETE',
            url : `${this.server}/user/product/${id}/${productID}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            console.log("모듈 반환값 : ", response)
            return true;
        }).catch(() => {
            return false;
        })
    }
}

export default UserProduct;