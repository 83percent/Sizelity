import { useEffect, useRef, useState } from 'react';


// CSS
import '../contents/css/View/View_Compare_Main.css';

// Component
import Compare from '../components/View/View_Compare';
import SearchResult from '../components/View/View_SearchResult';
import ProductData from '../contents/js/ProductData';

let productData = null;
const ViewCompare = (props) => {
    const searchInput = useRef(null);
    const searchResultWrapper = useRef(null);

    const [data, setData] = useState(props.location.state.data);
    const [searchPraw, setSearchPraw] = useState(null);

    const search = {
        praw : null,
    }

    const myProductFrameClick = (e) => {
        const cl = e.target.classList;
        cl.contains("active") ? cl.remove("active") : cl.add("active");
    }
    const searchFrameClick = (e) => {
        e.stopPropagation();
        console.log(e);
        const cl = e.target.parentElement.classList;
        
        if(cl.contains("active")) {
            if(searchInput.current && searchInput.current.value.length > 16) {
                const value = searchInput.current.value;
                searchResultWrapper.current.classList.add("active");
                setSearchPraw(value);
            } else {
                cl.remove("active");
                searchResultWrapper.current.classList.remove("active");
            }
        } else {
            cl.add("active");
        }
    }
    const resultFrameClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(e.target.classList.contains("Compare-result-wrapper")) {
            e.target.classList.remove("active");
        }
        console.log("wrapper click : ", e.target);
    }
    return (
        <div id="View">
            <nav id="Compare-nav">
                <div id="Compare-top">
                    <div id="search-frame" className="nav-element" >
                        <input type="text" autoComplete="off" placeholder="상품의 주소를 입력해주세요" ref={searchInput} />
                        <i className="material-icons" onClick={(e) => {searchFrameClick(e)}} >search</i>
                    </div>
                    <div  className="nav-element">
                        <i className="material-icons">menu</i>
                    </div>
                </div>
                <div className="Compare-result-wrapper" ref={searchResultWrapper} onClick={(e) => {resultFrameClick(e)}} >
                    <SearchResult 
                        praw={searchPraw}
                        setData={setData} />
                </div>
            </nav>
            <nav id="myProduct-nav">
                <div id="myProduct-wrapper" onClick={(e) => {myProductFrameClick(e)}} >
                    <div id="myProduct-frame" ></div>
                </div>
            </nav>
            <Compare
                productData={data} />    
            <div id="ad"></div>
        </div>
    );
}
export default ViewCompare;