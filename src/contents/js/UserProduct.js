/*
    2021-08-29 이재훈
    - Set 메소드 추가
*/

import axios from 'axios';
import StatusCode from './StatusCode';

/*
    사용자의 옷장 상품 핸들링
*/
// Singleton
let instance = null;
class UserProduct {
    constructor(server) {
        if(instance) return instance;
        this.server = server;
        instance = this;
    }
    // 상품 목록 불러오기
    async get(id) {
        if(id === undefined) return StatusCode.invalid; // invalid
        return await axios({
            method: 'GET',
            url : `${this.server}/user/product`,
            withCredentials: true,
            timeout : 3500
        }).then(response => {
            if(response.status === 200) return {type : 'success', data: response.data};
            else return {type : 'error', msg: '문제가 발생했어요'};
        }).catch(err => {
            if(err?.response?.data?.error)  {
                if(err?.response.status == 401) return {type:'error', msg: '로그인 후 이용가능 합니다'};
                else return {type:'error', msg: err.response.data.error}
            }
            else return {type: 'error', msg: '네트워크 연결을 확인하세요'}
        })
    } // get(id)

    async set(productData) {
        return await axios({
            method : 'POST',
            url: `${this.server}/user/product`,
            data: productData,
            withCredentials: true,
            timeout: 3500
        }).then(response => {
            switch(response.status) {
                case 200 : return {type: 'success'};
                case 202 : return {type: 'error', msg: response.data?.error};
                default : return {type: 'error', msg: '문제가 발생했어요'}
            }
        }).catch(err => {
            if(err?.response?.data?.error)  {
                if(err?.response.status == 401) return {type:'error', msg: '로그인 후 이용가능 합니다'};
                else return {type:'error', msg: err.response.data.error}
            }
            else return {type: 'error', msg: '네트워크 연결을 확인하세요'}
        })
    }

    async patch(productData) {
        return await axios({
            method: 'PATCH',
            url : `${this.server}/user/product`,
            data : productData,
            withCredentials: true,
            timeout: 3500
        }).then(response => {
            console.log(response);
            switch(response.status) {
                case 200 : return {type: 'success'};
                case 202 : return {type: 'error', msg: response.data?.error};
                default : return {type: 'error', msg: '문제가 발생했어요'}
            }
        }).catch(err => {
            if(err?.response?.data?.error)  {
                if(err?.response.status == 401) return {type:'error', msg: '로그인 후 이용가능 합니다'};
                else return {type:'error', msg: err.response.data.error}
            }
            else return {type: 'error', msg: '네트워크 연결을 확인하세요'}
        })
    }

    async remove(id, productID) {
        if(id === undefined) return StatusCode.invalid; // invalid
        return await axios({
            method : 'DELETE',
            url : `${this.server}/user/product/${id}/${productID}`,
            withCredentials: true,
            timeout: 3500
        }).then(response => {
            if(response.status === 200) {
                return true;
            } else return false;
        }).catch(() => {
            return false;
        })
    }
}

export default UserProduct;