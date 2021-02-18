// Module
import Proptype from 'prop-types';
import { useEffect, useState } from 'react';

// CSS
import '../../contents/css/View/View_SearchResult.css';

// Component
import SearchResultElement from "./SearchResultElement";

//let beforeURL = ""; // setState 변경시 한번만 적용을 위해 기존에 입력 정보를 저장해둠
const SearchResult = ({requestURL}) => {
    console.log(requestURL);
    const [data, setData] = useState(null);
    useEffect(() => {
        result.wrapper.frame = document.getElementById("search-result-frame");
        result.view.frame = document.getElementById("search-result");
        result.loader.frame = document.getElementById("loader-frame");
        //if(requestURL !== beforeURL) { // 같은 값을 가진 경우 검색 X 및 setState 한번만 적용을 위해
            if(requestURL) {
                /*
                    유효한 Request URL 인지 확인 후 searchAnim() 실행
                */
                result.wrapper.startAnim();
                result.view.search(requestURL, setData);
            } else {
                result.wrapper.closeAnim();
                result.view.stop();
            }
            //beforeURL = requestURL;
        //}
    }, [requestURL]);
    return (
        <div id="search-result-frame" className="off">
            <SearchResultElement data={data} loaderClose={result.loader.off}/>
            <div id="loader-frame" className="off">
                <div className="loader"></div>
            </div>
        </div>
    );
}

const result = {
    wrapper : {
        frame : null,
        startAnim : function() {
            let isClose = this.frame.classList.contains("off");
            if(isClose) {
                // class 에 off 가 있음, 화면에 안보임. -> 보이게 해줘야함
                this.frame.classList.replace("off","on");
            } else {
                result.view.frame.classList.replace("on","off");
            }
            result.loader.on();
        },
        closeAnim : function() {
            let isOpen = this.frame.classList.contains("on");
            if(isOpen) {
                // div#loader-frame transition-duration: 0.3s;
                result.view.frame.classList.replace("on","off");
                result.loader.off();
                
                setTimeout(()=> {this.frame.classList.replace("on","off");}, 400);
            }
        }
    },
    view : {
        frame : null,
        searchTime : null,
        // @param setData : data state[1];
        search : async function(requestURL, setData) {
            // 실제 로딩되는 현상을 표현하기 위해 Timeout을 사용하여 지연시킴
            let data = await productJSON();
            console.log(data); // 들어온 JSON 데이터 확인
            try {
                this.frame.classList.replace("off","on");
                data = JSON.parse(data);
                console.log("get Server JSON -> Object : ",data);
                
                // 데이터가 없는 경우도 생각해야함. 일단 있다는 가정만 하고 만드는 중
                setData(data);
                
            } catch(err) {
                // Error 발생
                console.error(err);
            }
        },
        stop : function() {
            if(this.searchTime != null) {
                clearTimeout(this.searchTime);
                this.searchTime = null;
            }
        }
    },
    loader : {
        frame : null,
        on : function() {
            //this.frame.style.display = "block";
            this.frame.classList.replace("off", "on");
        },
        off : function() {
            // loaderFrame     transition-duration: 0.3s;

            const frame = document.getElementById("loader-frame");
            frame.classList.replace("on", "off");
            setTimeout(() => {
         //       frame.style.display = "none";
            },2000);
        }
    }
}


SearchResult.proptype = {
    requestURL : Proptype.string.isRequired
}

export default SearchResult;

// Sample Data
const productJSON = () => {
    const returnobj = {
        status : 200,
        praw : {
            type : "branduid",
            code : "27123",
            full : "www.jogunshop.com/shop/shopdetail.html?branduid=27123"
        },
        info : {
            sname : "조군샵",
            pname : "데이런온 레직기 트임 데님",
            ptype : "하의",
            subtype : "긴바지",
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
        }
    }
    // 서버사이드에서 넘어오는 것과 비슷한 환경 조성
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.stringify(returnobj));
            reject(null);
            console.log("get data from server.....");
        }, 1000);
    });
}