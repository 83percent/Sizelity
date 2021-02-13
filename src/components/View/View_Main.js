// Module
import { useEffect, useState } from 'react';

// CSS
import '../../contents/css/View/View_Main.css';

// Component
import ResultFrame from './SearchResult';

const Main = () => {
    const [praw, setPraw] = useState("");
    let searchEvent = {
        minLength : 16,
        inputURLFrame : null,
        searchBtn : null,
        lowChange : true, // minLength 이하로 내려갔을때 딱한번 ResultFrame component 에 중지 요청을 보냄
        changeEvent : function(e) {
            if(e.target.value.length > this.minLength) {
                this.searchBtn.classList.remove("off");
            } else {
                this.searchBtn.classList.add("off");
                if(praw) {
                    // minLength 이하로 내려갔을때 한번만 실행 됨. -> result frame class add off
                    setPraw("");
                }
            }

        },
        // Send Event
        keyDownEvent : function(e) {
            if(e.key === 'Enter') {
                this.changePraw();
            }
        },
        clickEvent : function() {
            this.changePraw();
        },
        changePraw : function() {
            let val = this.inputURLFrame.value;
            if(this.inputURLFrame === null) return false;
            if(val.length > this.minLength) {
                setPraw(val);
                this.lowChange = false;
                return true;
            }
        }
    }
    useEffect(() => {
        if(searchEvent.inputURLFrame === null) searchEvent.inputURLFrame = document.getElementById("View-searchInputForm");
        
        if(searchEvent.searchBtn === null) searchEvent.searchBtn = document.getElementById("search-input-btn");
    });
    
    return (
        <section id="Main">
            <div id="search-wrapper">
                <div id="title">
                    <h1>상품 주소를 입력하세요.</h1>
                </div>
                <div id="search-input-wrapper">
                    <div id="search-input-frame">
                        <input type="text" id="View-searchInputForm" placeholder="www.example.com/..." autoComplete="off" onKeyPress={(e) => {searchEvent.keyDownEvent(e)}} onChange={(e) => searchEvent.changeEvent(e)}/>
                        <button id="search-input-btn" className="off" onClick={() => searchEvent.clickEvent()}>검색</button>
                    </div>
                    <ResultFrame 
                        requestURL={praw}/>
                </div>
                
            </div>
        </section>
    );
}

export default Main;