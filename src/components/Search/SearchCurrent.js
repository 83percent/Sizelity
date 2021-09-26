import { useRef, useState } from 'react';
import URLModule from '../../contents/js/URL';
import SearchHistory from '../../contents/js/SearchHistory';

const SearchCurrent = ({history}) => {
    // Field
    const searchHistory = new SearchHistory()

    // State
    const [deleteOption, setDeleteOption] = useState(false);
    const [current, setCurrent] = useState(searchHistory.get())

    // ref
    const isChange = useRef(false);
    
    const event = {
        toggleNavBtn() {
            // 저장 버튼을 누를 때만 삭제된 정보를 저장.
            if(deleteOption) {
                if(isChange.current && current.length > 0) {
                    const _c = current.filter(element => element !== null)
                    searchHistory.saveAll(_c); 
                    setCurrent(_c);
                    isChange.current = false;
                }
            }
            setDeleteOption(!deleteOption);
        },
        moveCompare: async(element) => {
            const __u = new URLModule();
            const {domain, code} = __u.get(element[3]); // full
            if(domain || code) {
                history.push({
                    pathname: "/compare",
                    search: `?shop=${domain}&no=${code}`,
                });
            }
        },
        remove: (target, index) => {
            if(!current) return;
            for(let i=0; i<6; ++i) {
                if(target.nodeName === "LI") {
                    break;
                } else target = target.parentElement;
            }
            if(!target.nodeName === "LI") return false;
            else {
                current[index] = null;
                target.classList.add("remove");
                setTimeout(() => {target.style.display = 'none'},360);
                isChange.current = true;
            }
        }
    }
    return (
        (current && current.length > 0) ? (
            <div className="current-wrapper">
                <header>
                    <h1>최근 본 상품</h1>
                    <button onClick={() => event.toggleNavBtn()} className={deleteOption ? 'save' : 'delete'}>
                        <p>{deleteOption ? "저장" : "삭제"}</p>
                    </button>
                </header>
                <ul className={deleteOption ? "on" : ""}>
                {current.map((element, index) => {
                    if(element !== null) {
                        return (
                            <li key={index}>
                                <div>
                                    <div onClick={() => event.moveCompare(element)} className="info-frame">
                                        <div className="title">
                                            <p>{element[0]}</p>
                                            <h1>{element[1]}</h1>
                                        </div>
                                        <div>
                                            <p style={{textAlign:"right"}}>{element[2]}</p>
                                        </div>
                                    </div>
                                    <a href={`http://${element[3]}`}>
                                        <i className="material-icons">open_in_new</i>
                                    </a>
                                </div>
                                <button onClick={(e) => event.remove(e.target, index)}>
                                    <i className="material-icons">remove</i>
                                </button>
                            </li>
                            
                        )
                    } else return null;
                })}
                </ul>
            </div>
        ) : (
            <div className="current-wrapper">  
                <header>
                    <h1>최근 본 상품</h1>
                </header>
                <ul>
                    <li className="Search-currentNone">
                        <p>최근 본 상품이 없습니다.</p>
                    </li>
                </ul>
            </div>
        )
    )
}

export default SearchCurrent;
