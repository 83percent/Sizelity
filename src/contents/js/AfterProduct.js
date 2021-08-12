import axios from 'axios';
import StatusCode from './StatusCode';
class AfterProduct {
    constructor(server) {
        this.server = server;
    }
    // 불러오기
    async get() {
        return await axios({
            method: 'GET',
            url : `${this.server}/after`,
            withCredentials: true,
            timeout : 7500
        }).then(response => {
            if(response.status === 200) {
                return response.data;
            }
        }).catch(err => {
            if(err?.response?.data?.error) return {type: "error", msg : err.response.data.error}
            else return {type: "error", msg : "네트워크 연결을 확인해주세요."}
        })
    } // get
    // 저장
    async set(productID) {
        return await axios({
            method : 'POST',
            url : `${this.server}/after`,
            data: {productID},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                return {type: "success"}
            } else {
                return {type: "error", msg : response.data.error}
            }
        }).catch(err => {
            if(err?.response?.data?.error) return {type: "error", msg : err.response.data.error}
            else return {type: "error", msg : "네트워크 연결을 확인해주세요."}
        })
    } // set

    // 삭제
    async remove(productID) {
        return await axios({
            method: 'DELETE',
            url : `${this.server}/after`,
            data: {productID},
            withCredentials: true,
            timeout : 5500
        }).then(response => {
            if(response.status === 200) return true;
            else return false;
        }).catch(() => {
            return false;
        })
    }
} // AfterProduct class
export default AfterProduct;

/*
{
    _id : String,   
    upwd : String,
    product : {
        praw : {
            domain : String,
            code : String,
            full : String
        },
        info : {
            sname : String,
            pname : String,
            subtype : String
        }
    }
}
*/