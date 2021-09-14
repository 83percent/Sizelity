const { default: axios } = require("axios");

class Event {
    constructor(server) {
        this.server = server;
    }
    getCate() {
        return [
            ["free","무료배송"],
            ["discount","할인"],
            ["coupon", "쿠폰"],
            ["saving", "적립"],
            ["etc", "기타"]
        ];
    }

    getADEventList(type) {
        return axios({
            method: 'GET',
            url : `${this.server}/ad/event/promotion/${type}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            switch(response.status) {
                case 200 : return {type:'success', data: response.data};
                case 204 : 
                default : return {type: 'error'};
            }
        }).catch(() => {
            return {type: 'error'};
        })
    }

    getList(type, count) {
        return axios({
            method : 'GET',
            url : `${this.server}/ad/event/list/${type}/${count}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            switch(response.status) {
                case 200 : return {type:'success', data: response.data};
                case 204 : 
                default : return {type: 'error'};
            }
        }).catch(() => {
            return {type: 'error'};
        })
    }
}

export default Event;