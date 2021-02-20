import { fireEvent } from '@testing-library/react';
import { sample } from 'lodash-es';
import Cookie from './Cookie';
import Product from './ProductData'; // 서버와 연결되기 전까지 임시 로 사용하는 샘플데이터가 담긴 장소


class ProductSearch {
    constructor() {
        this.current = undefined; // :array
        this.cookie = new Cookie();

        this.cnameCurrent = "currentSearchData";
    }
    getCurrent() {
        if(!this.current) this.refreshCurrent();
        return this.current; //:array
    }
/*
    @params data :  최근본 상품에 추가할 데이터
    Array index info
    {
        pcode: "PA000001", -- 0
        sname: "string", -- 1
        pname:"string", -- 2
        subtype:"string", -- 3
        praw : "string" -- 4
    }
*/
    setCurrent(data) {
        if(data && data.status === 200 && data.pcode !== undefined) {
            let _current = this.getCurrent();

            const createElement = (data) => {
                return (
                    [
                        data.pcode,
                        data.info.sname,
                        data.info.pname,
                        data.info.subtype,
                        data.praw.full
                    ]
                );
            }

            if(_current && _current.constructor === Array) {
                // 중복확인
                const pcode = data.pcode;
                let _isOver = false;
                for(const index in _current) {
                    if(_current[index][0] === pcode) {
                        
                        _isOver = true;
                        break;
                    }
                }
                if(_isOver) return _current;
            } else {
                _current = [];
                
            }
            console.log(createElement(data));
            _current.unshift(createElement(data));
            this.cookie.set(this.cnameCurrent,_current);
            return _current;
        } else {
            return null;
        }
    }
    refreshCurrent() { // refresh
        this.current = this.cookie.get("currentSearchData");
    }
    
    fetchCurrent(changeCurrent) {
        if(!this.current) return null; 

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
    search(pcode) {
        const sample = new Product();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for(const index in sample.data) {
                    if(sample.data[index]["pcode"] === pcode) {
                        resolve(sample.data[index]);
                        break;
                    }
                }
                resolve(null);
            },500);
        });
    }
}
export default ProductSearch;