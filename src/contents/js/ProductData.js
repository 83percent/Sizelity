class Product {
    constructor(number = 2) {
        this.data = obj;
        this.sampleNumber = number;
    }
    get(raw = null) {
        if(raw === null) return new Error("want to get data raw is null");
        console.log('%c \t\tSearch Product... : ',"background:red;color:#fff;",raw);
        try {
            return new Promise((resolve, reject) => {
                
                setTimeout(() => {
                    console.log('%c \t\tFinish Search Product!!! : ',"background:red;color:#fff;",obj[this.sampleNumber]);
                    resolve(obj[this.sampleNumber]);
                },1500);
            });
        } catch(error) {
            return null;
        }
    }
}

export default Product;


/*
    SAMPLE DATA POOL
*/
const obj = [
    { // 0
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0001",
        praw : {
            domain : "www.jogunshop.com",
            type : "branduid",
            code : "27123",
            full : "www.jogunshop.com/shop/shopdetail.html?branduid=27123"
        },
        info : {
            sname : "조군샵",
            pname : "데이런온 레직기 트임 데님",
            ptype : "bottom",
            subtype : "긴바지"
        },
        size : [
            {
                name: "S",
                length : 103.5,
                waist : 39,
                crotch : 31,
                hips : 51,
                thigh : 29.5,
                hem : 20
                
            },
            {
                name: "M",
                length : 104.5,
                waist : 41,
                crotch : 32,
                hips : 52.5,
                thigh : 31.5,
                hem : 21
                
            },
            {
                name: "L",
                length : 105.5,
                waist : 43,
                crotch : 33,
                hips : 54,
                thigh : 33.5,
                hem : 22
                
            },
            {
                name: "XL",
                length : 106.5,
                waist : 45,
                crotch : 34,
                hips : 55.5,
                thigh : 35.5,
                hem : 23
                
            }
        ]
    },
    { // 1
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0002",
        praw : {
            domain : "www.jogunshop.com",
            type : "branduid",
            code : "26598",
            full : "www.jogunshop.com/shop/shopdetail.html?branduid=26598"
        },
        info : {
            sname : "조군샵",
            pname : "탄탄한 앤디 텍스쳐 라운드 긴팔티",
            ptype : "top",
            subtype : "긴팔"
        },
        size : [
            {
                name: "M",
                shoulder : 48,
                chest : 54,
                arm: 24,
                sleeve: 59,
                length: 68.5
            },
            {
                name: "L",
                shoulder : 50,
                chest : 56,
                arm: 25,
                sleeve: 60,
                length: 70.5
            },
            {
                name: "XL",
                shoulder : 52,
                chest : 58,
                arm: 26,
                sleeve: 61,
                length: 72.5
            },
            {
                name: "2XL",
                shoulder : 54,
                chest : 60,
                arm: 27,
                sleeve: 62,
                length: 74.5
            },
            {
                name: "3XL",
                shoulder : 56,
                chest : 62,
                arm: 28,
                sleeve: 63,
                length: 76.5
            }
        ]
    },
    { // 2
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0003",
        praw : {
            domain : "www.mr-s.co.kr",
            type : "product",
            code : "39581",
            full : "mr-s.co.kr/product/%EB%A1%9C%EC%9D%B8-%EB%A9%94%EC%A2%85-%EB%B8%8C%EC%9D%B4%EB%84%A5-%EB%8B%88%ED%8A%B8/39581"
        },
        info : {
            sname : "미스터스트릿",
            pname : "로인 메종 브이넥 니트",
            ptype : "top",
            subtype : "긴팔"
        },
        size : [
            {
                name: "Free",
                shoulder : 78,
                chest : 73,
                arm: 24,
                sleeve: 52,
                length: 73
            }
        ]
    },
    { // 3
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0004",
        praw : {
            domain : "www.mr-s.co.kr",
            type : "product",
            code : "39581",
            full : "mr-s.co.kr/product/%EB%A1%9C%EC%9D%B8-%EB%A9%94%EC%A2%85-%EB%B8%8C%EC%9D%B4%EB%84%A5-%EB%8B%88%ED%8A%B8/39581"
        },
        info : {
            sname : "미스터스트릿",
            pname : "로인 메종 브이넥 니트",
            ptype : "set",
            subtype : "세트"
        },
        size : [
            {
                name: "Free",
                shoulder : 59,
                chest : 60,
                sleeve: 57,
                T_length: 69,

                waist: 32,
                crotch: 30.5,
                thigh: 30.5,
                hem : 13,
                B_length: 92.5
            }
        ]
    },
    { // 4
        status : 404
    },
    { // 5
        status : 300
    }
];