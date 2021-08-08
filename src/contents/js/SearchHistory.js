/*
    2021-08-04
    작성자 : 이재훈

    SearchHistory
    
    검색기록을 핸들링하는 클래스
    저장 방식 -> Local Storage 이용
    [
        [sname, pname, subtype, full]
    ]
*/

class SearchHistory {
    constructor() {
        this.__key = "history" // 오리진에 저장된 key 명칭
        this.history = (() => {
            try {
                const _h = JSON.parse(localStorage.getItem(this.__key));
                return _h ? _h : [];
            } catch {
                return [];
            }
        })(); // 불러온 최근 검색기록을 저장할 배열
    }
    // 기록 불러오기
    get() {
        return this.history;
    }
    // 기록 저장하기
    set({sname, pname, subtype, full}) {
        if(!sname || !pname || !subtype || !full) {
            throw new Error("Try to save invalid data of product history.");
        }
        if(!this.isExist(sname, pname)) {
            // 중복 없음.
            if(this.history?.length >= 30) {
                this.history.pop();
            } else if(!this.history) this.history = [];
            this.history.unshift(
                [sname, pname, subtype, full]
            );
            
            localStorage.setItem(this.__key, JSON.stringify(this.history));
        }
    }

    isExist(shopName, productName) {
        if(this.history?.length <= 0) return false;
        return this.history.filter(element => {
            return (element[0] === shopName && element[1] === productName);
        }).length !== 0;
    }
    
    // set() 기능에 전달해줘야하는 데이터 폼
    getDoc() {return {sname: undefined, pname:undefined, subtype:undefined, praw:undefined};}


    // history 에서 정보 삭제
    remove(index) {
        
    }
    
    // 전달된 배열 전체 저장
    saveAll(array) {
        try {
            localStorage.setItem(this.__key, JSON.stringify(array));
            return true;
        } catch {
            return false;
        }
    }

    // History의 모든 정보를 삭제
    removeAll() {
        localStorage.removeItem(this.__key);
        this.history = [];
    }
}

export default SearchHistory;