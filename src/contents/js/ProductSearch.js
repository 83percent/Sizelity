import axios from "axios";
import StatusCode from "./StatusCode";
import URLModule from './URL';
import SearchHistory from "./SearchHistory";

class ProductSearch {
    constructor(server) {
        this.server = server;
        this.urlModule = null;
    }

    /*
        상품 검색 방법 3가지
        1. Full을 넘겨 받아 분석 후 domain 과 code를 가지고 검색
        2. domain 과 code를 넘겨 받아 검색 (사용자가 데이터를 이미 가지고 있는 경우 ex. 검색기록)
        3. _id로 검색하는 경우 (사용자가 데이터를 이미 가지고 있는 경우 ex. 나의 상품)

        
        search({_id, url, domain, code})
        Object 타입의 Parameter 를 넘겨줘야한다.
    */
    async search({_id, url, domain, code}) {
        // 검색 우선순위 _id -> url -> domain + code
        if(_id) {
            // ID 로 검색
            return await this._useIDSearch(_id);
        } else {
            // url, domain + code 로 검색
            let full;
            if(url !== undefined && (!domain && !code)) {
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
                    return StatusCode.invalid;
                }
            }
            // domain 과 code로 검색 요청
            const result = await this._useDomainCodeSearch(domain, code, full);
            return result;
        }
    }


    // _id 값을 가지고 검색하는 함수 (private)
    async _useIDSearch(id) {
        if(!id) return StatusCode.invalid;
        return await axios({
            method : 'GET',
            url : `${this.server}/product/${id}`,
            timeout : 7500
        }).then(response => {
            switch(response.status) {
                case 200 : {
                    new SearchHistory().set({
                        sname : response.data.info.sname,
                        pname : response.data.info.pname,
                        subtype : response.data.info.subtype,
                        full : response.data.praw.full
                    });
                    return response.data;
                }
                default : {
                    return response.status;
                }
            }
        }).catch(err => {
            //console.error(err);
            if(err?.response?.status) return err.response.status;
            else return 0; // Timeout?
        });
    }

    // Domain 과 Code 로 검색하는 함수 (Private)
    async _useDomainCodeSearch(domain, code, full) {
        if(!domain || !code) return StatusCode.invalid;
        return await axios({
            method : 'POST',
            url: `${this.server}/product/search`,
            data: {
                domain, code, full
            },
            timeout: 7500
        }).then(response => {
            switch(response.status) {
                case 200 : {
                    new SearchHistory().set({
                        sname : response.data.info.sname,
                        pname : response.data.info.pname,
                        subtype : response.data.info.subtype,
                        full : response.data.praw.full
                    });
                    return response.data;
                }
                default : {
                    return response.status;
                }
            }
        }).catch(err => {
            console.error(err);
            console.log(err?.response?.status);
            if(err?.response?.status) return err.response.status;
            else return 0; // Timeout?
        });
    }
}

export default ProductSearch;