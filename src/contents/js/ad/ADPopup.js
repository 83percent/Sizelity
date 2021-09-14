import axios from "axios";

class Popup {
    constructor(server) {
        this.server = server;
    }

    getPopup() {
        return axios({
            method : 'GET',
            url: `${this.server}/ad/popup`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data : response.data};
            else return null;
        }).catch(() => {
            return null;
        })
    }
}

export default Popup;