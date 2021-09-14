import axios from "axios";
import URLModule from './URL';
import SearchHistory from "./SearchHistory";

let instance = null;
class ProductSearch {
    constructor(server) {
        if(!instance) instance = this;
        this.server = server;
        this.urlModule = null;
        return instance;
    }

    /*
        상품 검색 방법 3가지
        1. Full을 넘겨 받아 분석 후 domain 과 code를 가지고 검색
        2. domain 과 code를 넘겨 받아 검색 (사용자가 데이터를 이미 가지고 있는 경우 ex. 검색기록)
        3. _id로 검색하는 경우 (사용자가 데이터를 이미 가지고 있는 경우 ex. 나의 상품)

        
        search({_id, url, domain, code})
        Object 타입의 Parameter 를 넘겨줘야한다.
    */
    async search({_id, url, domain, code}, save=true) {
        // 검색 우선순위 _id -> url -> domain + code
        if(_id) {
            // ID 로 검색
            return await this._useIDSearch(_id, save);
        } else {
            // url, domain + code 로 검색
            let full = url;
            if(url !== undefined && (!domain || !code)) {
                // URL 만 있고 domain + code 가 없으면 domain + code를 분석하여 다음단계 진행
                try {
                    if(!this.urlModule) this.urlModule = new URLModule();
                    const {domain:  _domain, code: _code, full: _full} = this.urlModule.get(url);
                    if(!_domain && !_code && !_full) {
                        // 분석 할 수 없는 URL
                        return 403;
                    }
                    domain = _domain;
                    code = _code
                    full = _full;
                } catch(err) {
                    //console.error(err);
                    return {type: 'error', msg : '잘못된 접근입니다.'};
                }
            }
            // domain 과 code로 검색 요청
            const result = await this._useDomainCodeSearch(domain, code, full, save);

            return result;
        }
    }


    // _id 값을 가지고 검색하는 함수 (private)
    async _useIDSearch(id, save) {
        if(!id) return {type: 'error', status: 400, msg : '잘못된 접근입니다.'};
        return await axios({
            method : 'GET',
            url : `${this.server}/product/${id}`,
            timeout : 4500
        }).then(response => {
            switch(response.status) {
                case 200 : {
                    if(save) {
                        new SearchHistory().set({
                            sname : response.data.info.sname,
                            pname : response.data.info.pname,
                            subtype : response.data.info.subtype,
                            full : response.data.praw.full
                        });
                    }
                    return {type: 'success', data : response.data};
                }
                case 204 : return {type: 'error', status: 204, msg: '상품 정보가 없어 쇼핑몰 측에 정보 요청을 보냈어요.'};
                default : return {type: 'error', status: 500, msg : '문제가 발생했어요'};
            }
        }).catch(err => {
            //console.error(err);
            if(err?.response?.data?.error) return {type: 'error', status: err.response.status, msg : err.response.data.error};
            else return {type: 'error', msg : '네트워크 연결을 확인하세요'};
        });
    }

    // Domain 과 Code 로 검색하는 함수 (Private)
    async _useDomainCodeSearch(domain, code, full, save) {
        if(!domain || !code) return {type: 'error', status: 400, msg : '잘못된 접근입니다.'};
        return await axios({
            method : 'POST',
            url: `${this.server}/product/search`,
            data: {
                domain, code, full
            },
            timeout: 4500
        }).then(response => {
            console.log("검색 결과 : ",response);
            switch(response.status) {
                case 200 : {
                    if(save) {
                        try {
                            new SearchHistory().set({
                                sname : response.data.info.sname,
                                pname : response.data.info.pname,
                                subtype : response.data.info.subtype,
                                full : response.data.praw.full
                            });
                        } finally {
                            return {type: 'success', data : response.data};
                        }
                    }
                    break;
                }
                case 204 : return {type: 'error', status: 204, msg: '상품 정보가 없어 쇼핑몰 측에 정보 요청을 보냈어요.'};
                default : return {type: 'error', status: 500, msg : '문제가 발생했어요'};
            }
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', status: err.response.status, msg : err.response.data.error};
            else return {type: 'error', msg : '네트워크 연결을 확인하세요'};
        });
    }
}

export default ProductSearch;