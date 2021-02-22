class AfterProductData {
    constructor() {
        this.afterList = null;
    }
    get() {
        if(this.afterList) {
            return this.afterList;
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.afterList = sample;
                    resolve(sample);
                }, 1500);
            });
        }
    }
    // 나중에 볼 상품 저장하는 부분인데 서버내에 저장하는 형식으로 변환해야함.
    set(data) {

    }
}
/*
    Data Format
    [
        {
            pcode : "PAAA0001", -- 0
            sname : "string", -- 1
            pname : "string", -- 2
            subtype : "string", -- 3
            praw : "string" -- 4
        }, ...
    ]
*/
const sample = [
    {
        pcode : "PAAA0001", 
        sname : "조군샵", 
        pname : "데이런온 레직기 트임 데님", 
        subtype : "긴바지", 
        praw : {
            full: "www.jogunshop.com/shop/shopdetail.html?branduid=27123",
            code : "27123"
        }
    }
];
export default AfterProductData;