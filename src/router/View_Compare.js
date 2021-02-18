import { useCallback, useRef, useState } from 'react';

// CSS
import '../contents/css/View/View_Compare_Main.css';

// Component
import Compare from '../components/View/View_Compare';
import SearchResult from '../components/View/View_SearchResult';
import MyProduct from '../contents/js/MyProductData';
import NavMyProduct from '../components/View/View_Nav_MyProduct';
import Menu from '../components/View/View_Menu';


const ViewCompare = (props) => {
    const searchInput = useRef(null);
    const searchResultWrapper = useRef(null);
    const menuFrame = useRef(null);

    const [data, setData] = useState(props.location.state.data);
    const [myData, setMyData] = useState(MyProduct.get());
    const [searchPraw, setSearchPraw] = useState(null);
    
    // send component function
    const changeStateData = useCallback((productData) => {
        if(productData.constructor === Object && productData.status === 200) {
            console.log("View_Compare : 데이터를 설정합니다.", productData);
            if(searchInput !== null) searchInput.current.value = "";
            toggleSearchResult(false);
            toggleSearchFrame(false);
            setData(productData);
        }
    }, []);
    // Result frame function
    const toggleSearchResult = (toggle) => {
        if(!searchResultWrapper.current) return;
        if(toggle === undefined) searchResultWrapper.current.classList.toggle("active");
        else {
            if(toggle.constructor !== Boolean) throw new Error("'toggleSearchResult' function parameter must Boolean dataformat.");
            searchResultWrapper.current.classList.toggle("active", toggle);
        }
    }
    // input frame function
    const toggleSearchFrame = (toggle) => {
        const frame  = searchInput.current.parentElement;
        if(toggle === undefined) {
            // 선언 안되어 있을 경우는 반대효과를 적용
                frame.classList.toggle("active");
        } else {
            if(toggle.constructor !== Boolean) throw new Error("'toggleSearchFrame' function parameter must Boolean dataformat.");
            frame.classList.toggle("active", toggle);
        }
    }
    const toggleMenuFrame = (e,toggle) => {
        if(e) e.stopPropagation();
        if(!menuFrame) return;
        if(toggle === undefined) {
            menuFrame.current.classList.toggle("active");
        } else {
            menuFrame.current.classList.toggle("active", toggle);
        }
    }
    const searchFrameClick = () => {
        const input = searchInput.current;
        const frame  = input.parentElement;

        if(frame.classList.contains("active")) {
            // 열려 있는 상태 (Active mode)
            if(input.value.length > 16) {
                // 조건 충족 -> 검색 시작 (send request to server)
                setSearchPraw(input.value);
                toggleSearchResult(true);
            } else {
                // 조건 미충족 -> close mode
                frame.classList.remove("active");
                //toggleSearchResult(false);
            }
        } else {
            // 닫혀 있는 상태 -> active mode
            frame.classList.add("active");
        }
    }
    return (
        <div id="View">
            <nav id="Compare-nav">
                <div id="Compare-top">
                    <div id="search-frame" className="nav-element" >
                        <input type="text" autoComplete="off" placeholder="상품의 주소를 입력해주세요" ref={searchInput} />
                        <i className="material-icons" onClick={() => {searchFrameClick()}} >search</i>
                    </div>
                    <div className="nav-element" onClick={() => menuFrame.current.classList.add("active")}>
                        <i className="material-icons">menu</i>
                    </div>
                </div>
                <div className="Compare-result-wrapper" ref={searchResultWrapper} onClick={() => {toggleSearchResult()}} >
                    <SearchResult 
                        praw={searchPraw}
                        setData={changeStateData} />
                </div>
            </nav>
            <section id="Menu" onClick={(e) => {toggleMenuFrame(e,false)}} ref={menuFrame}>
                <Menu />
            </section>
            
            <NavMyProduct
                myProductData={myData}
                setMyProductData={setMyData}/>
            <Compare
                productData={data} 
                myProduct={myData}/>    
        </div>
        

    );
}
export default ViewCompare;