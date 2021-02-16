
/*
    status : 
    200 - 완성
    401 - 임시저장된 데이터 => 계속 진행 할지 물어보고
*/


/* My Product Sample Data */
const _list = [
    {// 0
        status: 200,
        praw : {
            domain : "www.mr-s.co.kr",
            type : "product",
            code : "39573",
            full : "mr-s.co.kr/product/%EB%8D%94%ED%8B%B0-%EC%99%80%EC%9D%B4%EB%93%9C-%EB%8D%B0%EB%8B%98-%ED%8C%AC%EC%B8%A0/39573"
        },
        info : {
            sname : "미스터 스트릿",
            pname : "더티 와이드 데님 팬츠",
            ptype : "bottom",
            subtype : "긴바지",
            nick : "어두운 와이드 청바지"
        },
        size : {
            name: "L",
            T_length : 102,
            waist : 41,
            crotch : 34,
            thigh : 34,
            hem : 24
        }
    },
    { // 1 바지 / 슬랙스
        status: 200,
        praw : {
            domain : "www.zardins.com",
            type : "product_no",
            code : "5226",
            full : "www.zardins.com/product/detail.html?product_no=5226"
        },
        info : {
            sname : "자뎅",
            pname : "마스 롱 와이드 슬랙스",
            ptype : "bottom",
            subtype : "슬랙스",
            nick : "갈색 기장 긴 슬랙스"
        },
        size : {
            name : "L",
            waist : 44,
            crotch : 29,
            thigh : 33,
            hem : 23,
            B_length : 106
        }
    },
    { // 2 아우터 / 무스탕
        status: 200,
        praw : {
            domain : "www.mens-castle.co.kr",
            type : "product_no",
            code : "4926",
            full : "www.mens-castle.co.kr/product/detail.html?product_no=4926"
        },
        info : {
            sname : "MENS CASTLE",
            pname : "엔슬로우 무스탕",
            ptype : "outter",
            subtype : "무스탕",
            nick : "검은색 무스탕"
        },
        size : {
            name : "FREE",
            shoulder : 57,
            chest : 64,
            sleeve : 61,
            T_length : 71
        }
    },
    { // 3 하의 / 청바지
        status: 200,
        praw : {
            domain : "thesext.co.kr",
            type : "product",
            code : "2833",
            full : "thesext.co.kr/product/%EB%B2%84%EC%8A%A4%ED%8A%B8-%EB%8D%B0%EB%8B%98/2833"
        },
        info : {
            sname : "The-Sext",
            pname : "버스트 데님",
            ptype : "bottom",
            subtype : "청바지",
            nick : "와이드 노멀 청바지"
        },
        size : {
            name : "L",
            waist : 41,
            crotch : 31,
            thigh: 32,
            hem: 20,
            B_length: 99
        }
    },
    { // 4 하의 / 청바지
        status: 200,
        praw : {
            domain : "thesext.co.kr",
            type : "product",
            code : "2799",
            full : "thesext.co.kr/product/%ED%85%9C%ED%8C%8C%EB%B2%A0%EC%9D%B4-%EA%B8%B0%EB%AA%A8%ED%9B%84%EB%93%9C/2799"
        },
        info : {
            sname : "The-Sext",
            pname : "템파베이 기모후드",
            ptype : "top",
            subtype : "후드티",
            nick : "너덜너덜 후드티"
        },
        size : {
            name : "FREE",
            shoulder: 70,
            chest: 72,
            sleeve: 55,
            T_length: 67
        }
    },
    { // 5 하의 / 청바지
        status: 401,
        praw : {
            domain : "www.lookpine.com",
            type : "product",
            code : "4527",
            full : "www.lookpine.com/product/basic-%EC%86%8C%ED%94%84%ED%8A%B8-%EC%8A%AC%EB%9E%8D-%EB%B0%95%EC%8A%A4%ED%8B%B0%EC%85%94%EC%B8%A0/4527"
        },
        info : {
            sname : "LOOKPINE",
            pname : "BASIC 소프트 슬랍 박스티셔츠",
            ptype : "top",
            subtype : "긴팔",
            nick : "흰색 무지 긴팔"
        },
        size : {
 
        }
    }
];

class MyProductData {
    constructor() {
        if(this.instance) return this.instance;
        

        this.cname = "my_recently";
        this.exdays = 600;
        this.MyProduct = _list[3];

        this.instance = this;
        console.log("MyProductData Access");
    }
    getList() {
        try {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("Find Data!!! After return JSON Object Data!!");
                    console.log(_list);
                    resolve(this.__analyzeListData(_list));
                },1500);
            });
        } catch(error) {
            return null;
        }
    }
    get() { 
        if(this.MyProduct !== null && this.MyProduct.status === 200) return this.MyProduct;
        else {
            return this.__getCookieData();
        }
    }
    /*
        @param data : 
        @return : cookie 에 저장한 data
    */
    set(data) {
        if(data === undefined) {
            // param 비어있는 형태로 메소드 요청 = 현재 클래스에서 지정되어있는( 최근에 불러왔던 ) 데이터를 사용하겠다는 의미
            if(this.MyProduct.status === 200) {
                return this.__setCookieData(data);
            } else {
                // Error 아무것도 선택이 안된 상태에서 저장 요청을 보냄
                console.error('MyProductData Class of set(data) Method parameter is invaild data and send save request! : check "set()" method data ');
                return null;
            }
        } else {
            if(data.status === 200) {
                return this.__setCookieData(data);
            } else {
                // 요청한 param data 가 유효하지 않는 데이터를 보내옴.
                console.error('MyProductData Class of set(data) Method parameter is invaild data and send save request! : check "set()" method data ');
                return null;
            }
        }
    }

    // Private Method
    __setCookieData(data, _expires) {
        if(typeof data !== "object" || data.status !== 200) {
            console.log("MyProductData Class of set(data) Method parameter is invaild data");
            return null;
        }

        let expires = 0;
        if(_expires === undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (this.exdays * 24 * 60 * 60 * 1000));
            expires = "expires="+ d.toUTCString();
        } else {
            expires = _expires;
        }
        document.cookie = this.cname + "=" + data + ";" + expires + ";path=/";
    }
    __getCookieData() {
        try {
            const name = this.cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let c of ca) {
                while (c.charAt(0) === ' ') { c = c.substring(1); }
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
        } catch(error) {
            return null;
        }
        return null;
    }
    __removeCookieData() {
        this.__setCookieData(" ",-1)
    }
    __analyzeListData(listData) {
        const returnObj = {};
        for(const data of listData) {
            if(data.status !== 200) {}
            else {
                const ptype = data.info.ptype;
                
                if(returnObj[ptype] === undefined) returnObj[ptype] = [];
                returnObj[ptype].push(data);
            }
        }
        return returnObj;
    }
}
export default new MyProductData();


