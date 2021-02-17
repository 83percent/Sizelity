
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
            ptype : "outer",
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
            pname : "test1",
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
            pname : "test2",
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
    },{ // 1 바지 / 슬랙스
        status: 200,
        praw : {
            domain : "www.zardins.com",
            type : "product_no",
            code : "5226",
            full : "www.zardins.com/product/detail.html?product_no=5226"
        },
        info : {
            sname : "자뎅",
            pname : "테스트3",
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
            pname : "테스트 : 긴상품 명을 표기합니다. 의미없는 텍스트 입력하기",
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
    },{ // 1 바지 / 슬랙스
        status: 200,
        praw : {
            domain : "www.zardins.com",
            type : "product_no",
            code : "5226",
            full : "www.zardins.com/product/detail.html?product_no=5226"
        },
        info : {
            sname : "자뎅",
            pname : "mnasdf",
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
    }
];

class MyProductData {
    constructor() {
        if(this.instance) return this.instance;

        this.cname = "my_recently";
        this.exdays = 600;
        this.myProduct = null;
        this.instance = this;
    }
    getList() {
        try {
            return new Promise((resolve, reject) => {
                console.log("%c Send request : My Product List...","color: red");
                setTimeout(() => {
                    const listData = this.__analyzeListObject(_list);
                    console.log("%c Get Response : ","color: red", listData);
                    resolve(listData);
                },1500);
            });
        } catch(error) {return null;}
    }
    getListArray() {
        try {
            return new Promise((resolve, reject) => {
                (async () => {
                    const __responseObj = await this.getList();
                    resolve(this.__analyzeListArray(__responseObj));
                })();
            });
        } catch(error) {return null;}
    }
    get() { 
        if(this.myProduct !== null && this.myProduct.status === 200) return this.myProduct;
        else {
            console.log(this.__getCookieData());
            return this.__getCookieData();
        }
    }
    getPriority() {this.priority = ["set","outer","top","bottom"]}
    /*
        @param data : 
        @return : cookie 에 저장한 data
    */
    set(data) {
        if(data === undefined) {
            // param 비어있는 형태로 메소드 요청 = 현재 클래스에서 지정되어있는( 최근에 불러왔던 ) 데이터를 사용하겠다는 의미
            if(this.myProduct.status === 200) {
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
        console.log("\t\t Cookie !! - set Data -> ",data);
        if(typeof data !== "object" || data.status !== 200) {
            console.log("MyProductData Class of set(data) Method parameter is invaild data");
            return false;
        }
        
        let expires = 0;
        if(_expires === undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (this.exdays * 24 * 60 * 60 * 1000));
            expires = "expires="+ d.toUTCString();
        } else {
            expires = _expires;
        }
        console.log(expires);
        document.cookie = this.cname + "=" + JSON.stringify(data) + ";" + expires + ";path=/";
        return true;
    }
    __getCookieData() {
        /* try {
            const value = document.cookie.match('(^|;) ?' + this.cname + '=([^;]*)(;|$)');
            return value ? value[2] : null; 
        } catch(error) {return null}; */
         try {
            const name = this.cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let c of ca) {
                while (c.charAt(0) === ' ') { c = c.substring(1); }
                if (c.indexOf(name) === 0) {
                    const cookie = c.substring(name.length, c.length);
                    return JSON.parse(cookie);
                }
            }
        } catch(error) {
            return null;
        }
        
    }
    __removeCookieData() {
        this.__setCookieData(" ",-1)
    }
    __analyzeListObject(listData) {
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
    __analyzeListArray(listData) {
        const returnArr = [
            {set : []},
            {outer : []},
            {top : []},
            {bottom : []}
        ];
        let i = 0;
        for(const [key, arr] of Object.entries(listData)) {
            switch(key) {
                case "set" : {
                    returnArr[0]["set"] = arr;
                    break;
                }
                case "outer" : {
                    returnArr[1]["outer"] = arr;
                    break;
                }
                case "top" : {
                    returnArr[2]["top"] = arr;
                    break;
                }
                case "bottom" : {
                    returnArr[3]["bottom"] = arr;
                    break;
                }
                default : {break;}
            }
        }
        return returnArr;
    }
}
export default new MyProductData();


