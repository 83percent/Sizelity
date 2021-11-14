import axios from 'axios';

let instance = null;
class CompareCount {
    constructor(server) {
        if(instance) return instance;
        this.server = server;
        instance = this;
    }

    async done(domains) {
        //console.log("카운팅 : ",domains);

        await axios({
            method: 'POST',
            url : `${this.server}/compare/do`,
            data : domains,
            withCredentials: true,
            timeout: 5500
        });
    }
}
export default CompareCount;