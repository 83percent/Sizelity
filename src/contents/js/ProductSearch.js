import axios from 'axios';
import Cookie from './Cookie';
import URLModule from './URL';


const URL = "http://localhost:3001/product/get";
//const URL = "http://172.30.1.31:3001/product/get";

class ProductSearch {
    constructor() {
        this.current = undefined; // :array
        this.cookie = new Cookie();

        this.cnameCurrent = "sizelity_currentSearchData";
        this.URL = ""
    }
    getCurrent() {
        return this.refreshCurrent(); //:array
    }
/*
    @params data :  최근본 상품에 추가할 데이터
    Array index info
    {
        sname: "string", -- 0
        pname:"string", -- 1
        subtype:"string", -- 2
        praw : "string" -- 3
    }
    ex) [["조군샵","탄탄한 앤디 텍스쳐 라운드 긴팔티","긴팔","www.jogunshop.com/shop/shopdetail.html?branduid=26598"]]
*/

    setCurrent(data) {
        console.log("Current Set Cookie ", data);
        if(data && data.status === 200 && data.info.pname !== undefined) {
            console.log("%c Inner","background: darkorchid; color: #ffffff");
            let _current = this.getCurrent();

            const createElement = (data) => {
                return (
                    [
                        data.info.sname,
                        data.info.pname,
                        data.info.subtype,  
                        data.praw.full
                    ]
                );
            }

            if(_current && _current.constructor === Array) {
                // 중복확인
                const pname = data.info.pname;
                let _isOver = false;
                for(const index in _current) {
                    if(_current[index][1] === pname) {
                        
                        _isOver = true;
                        break;
                    }
                }
                if(_isOver) return _current;
            } else {
                _current = [];
                
            }
            if(_current.length > 20) {_current.pop();}
            _current.unshift(createElement(data));

            console.log("%c_current : ", "background:orange; color: #fff;",_current);

            this.cookie.set(this.cnameCurrent,_current);
            return _current;
        } else {
            return null;
        }
    }
    refreshCurrent() { // refresh
        this.current = this.cookie.get(this.cnameCurrent);
        return this.current;
    }
    
    fetchCurrent(changeCurrent) {
        let isChange = false;   
        const afterCurrent = [];
        changeCurrent.forEach(element => {
            if(element) {
                isChange = true;
                afterCurrent.push(element);
            }
        });
        if(isChange) {
            this.cookie.set(this.cnameCurrent, afterCurrent);
            return true;
        } else return false;
    }
    async search(url) {
        const urlModule = new URLModule();
        try {
            const data = urlModule.get(url);
            console.log(data);
            if(data === null) return {status : -404};
            if(data) {
                const response = await axios({
                    method : 'post',
                    url : URL,
                    data : data
                });
                console.log("%c Product Search Result : ", "background: red; color: #fff;",response.data);
                if(response.data._id) {
                    response.data.status = 200;
                }
                return response.data
            }
        } catch {
            return null;
        }
    }
    searchQuery(query) {
        // location.search
        const params = new URLSearchParams(query); // {'key' => 'value', ...}
        if(params.has("shop") && params.has("no")) {
            //const sname = params.get("shop");
            //const code = params.get("no");
            // Test Case
            
        } else {
            // 쿼리가 없음
            throw new Error("...");
        }
    }
}
export default ProductSearch;