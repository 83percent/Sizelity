class SizelityURL {
    /* constructor() {
        
    } */
    /*
        www.sizelity.com?shop=&no=[code]
        www.?branduid=[code]    
        www.?product_no=[code]
        www./product/.../[code]
        www./products/[code]
    */

    // logNo - 네이버이지만 query 중 proxy 지우면 url 변경됨
    get(_url) {
        let isFind = false;
        const result = {domain:undefined, code:undefined, type:undefined, full:undefined};
        const _pris = ["blog","smartstore"];
        const _codeParams = ['branduid', 'product_no', 'logNo', 'index_no'];
        const _pathParams = ['products','product'];
        try {
            if(_url.indexOf("http") === -1) {
                _url = "http://"+_url;
            }
            const url = new URL(_url);
            //console.log("URL : ",url);
            const params = new URLSearchParams(url.search);
            for(const codeParam of _codeParams) {
                // 1. branduid, product_no, logNo 있는지 확인
                if(params.has(codeParam)) {
                    isFind = true;
                    
                    result.code = params.get(codeParam);
                    result.type = codeParam;
                    
                    if(codeParam === _codeParams[2]) result.domain = params.get("blogId");
                    else result.domain = this.sliceWWW(url.hostname);
                    
                    result.full = this.sliceWWW(`${url.hostname}${url.pathname}?${codeParam}=${params.get(codeParam)}`);

                    break;
                }
            }
            if(isFind)  return result; // return result
            const pathArr = url.pathname.split("/");
            let hostName = this.sliceWWW(url.hostname);
            // _codeParams에서 못찾음
            // 2. product, products 찾기
            for(const pathParam of _pathParams) {
                if(pathArr[1] === pathParam) {
                    isFind = true;
                    result.domain = hostName;
                    result.type = pathParam;
                    switch(pathParam) {
                        case "products" : {
                            result.code = pathArr[2];
                            result.full = this.sliceWWW(`${url.hostname}/${pathParam}/${pathArr[2]}`);
                            break;
                        }
                        case "product" : {
                            result.code = pathArr[3];
                            result.full = this.sliceWWW(`${url.hostname}/${pathParam}/${pathArr[2]}/${pathArr[3]}`);
                            break;
                        }
                        default : {}
                    }
                    break;
                }
            }


            // 쇼핑몰은 아님 blog 종류로 찾기
            const hostNameArr = hostName.split(".");
            
            // Tistory 블로그
            if(hostNameArr[1] === "tistory") {
                // !! category 나뉘어지면서 arr index 1에 code가 안오는 경우가 있음
                // 해결책 : code가 전부 숫자로 이루어져있기에 숫자인지 확인
                // or 티스토리는 제일 마지막에 code가 붙는 것같음 맨뒤에 있는 index 를 code로 사용하면 될수도...
                result.domain = hostNameArr[0];
                if(!isNaN(Number(pathArr[1]))) {
                    // 2번째 'm'오는 지 확인
                    result.code = pathArr[1];  
                    result.full = `${hostNameArr[0]}.tistory/${pathArr[1]}`;
                } else {
                    // 2번째 path 가 code 아님
                    result.code = pathArr[2]; 
                    result.full = `${hostNameArr[0]}.tistory/${pathArr[1]}/${pathArr[2]}`;
                } 
                result.type = "tistory";
                
                return result;
            } else {
                // 네이버, 다음 블로그
                
                for(const pri of _pris) {
                    if(hostNameArr[0] === pri) {
                        // host 앞자에 m, blog, smartstore가 옴
                        //const _blogs = ["naver","daum"]; -> daum 분석 필요
                        const _blogs = ["naver"];
                        switch(pri) {
                            case "blog" : {
                                // blog.[  ???  ].com/[shop]/[key]
                                for(const blog of _blogs) {
                                    if(hostNameArr[1] === blog) {
                                        result.domain = pathArr[1];
                                        result.code = pathArr[2];
                                        result.type = `blog.${blog}`;
                                        result.full = `blog.${blog}.com/${pathArr[1]}/${pathArr[2]}`;
                                        isFind = true;
                                        break;
                                    }
                                }
                                break;
                            }
                            case "smartstore" : {
                                if(hostNameArr[1] === "naver") {
                                    result.domain = pathArr[1];
                                    result.code = pathArr[3];
                                    result.type = `smartstore`;
                                    result.full = `smartstore.naver.com/${pathArr[1]}/${pathArr[2]}/${pathArr[3]}`
                                    isFind = true;
                                }
                                break;
                            }
                            default : {}
                        }
                        break;
                    }
                }
            }
            if(isFind) return result;
            else return null;
            
        } catch(error) {
            console.error(error);
            return null;
        }
    }
    sliceWWW(hostname) {
        let i = hostname.indexOf("www");
        let result = i === -1 ? hostname : hostname.slice(i+4, hostname.length);
        // m. slice
        let m = result.indexOf("m.");
        return m === 0 ? result.slice(2,result.length) : result;
    }
    test(url) {
        this.___analyze(url);
    }
}
export default SizelityURL;