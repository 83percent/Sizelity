import axios from "axios";
import { useEffect, useRef, useState } from "react";
import URLModule from '../../../contents/js/URL';

// CSS
import '../../../contents/css/UserProduct/Step1.css';

let urlModule = null;
const server = 'http://localhost:3001';
//const server = 'http://192.168.11.2:3001';
const Step1 = ({data, setData, setStep, alertToggle}) => {
    // state
    const [product, setProduct] = useState(null);

    // ref
    const productInputWrapper = useRef(null);
    const productInput = useRef(null); // product url input frame
    const sizeListFrame = useRef(null);
    const applyBtn = useRef(null);
    const select = useRef({
        option : {
            value : undefined,
            frame : undefined
        },
        size : {
            value : undefined,
            frame : undefined,
            index : undefined
        }
    });

    console.log("검색 결과 : ",product);
    
    
    const event = {
        onSelect : (e) => {
            if(e) e.stopPropagation();
            else return;
            if(select.current.option.frame) {
                select.current.option.frame.classList.remove("on");
            }
            select.current.option.frame = e.target;
            for(let i=0; i < 3; ++i) {
                if(select.current.option.frame.classList.contains("selectOption")) {
                    select.current.option.frame.classList.add("on");
                    break;
                }
                select.current.option.frame = select.current.option.frame.parentElement;
            }
            select.current.option.value = select.current.option.frame.querySelector("input[type=hidden]").value;
            event.applyToggle();
        },
        productSearch : async () => {
            if(!urlModule) urlModule = new URLModule();
            if(productInput.current.value < 10) return; 
            let inputURL = productInput.current.value;
            try {
                inputURL = ((inputURL.indexOf("http") === 0) ? inputURL : "http://" + inputURL);
                const isURL = ((value) => {
                    return (/^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(value);
                })(inputURL);
                if(isURL) {
                    const analyze = urlModule.get(inputURL);
                    if(analyze) {
                        if(product && product.praw && product.praw.code === analyze.code) return; // 중복된 데이터 검색
                        const response = await axios({
                            method: 'get',
                            url: `${server}/product/get?shop=${analyze.domain}&no=${analyze.code}`,
                            timeout: 3500
                        }).catch((err) => {
                            alertToggle(true, "네트워크 오류");
                            return {data:{status:-200}}
                        });
                        if(response.data._id || response.data.status) setProduct(response.data);
                        else {
                            alertToggle(true, "잠시 후 다시 시도해주세요.");
                            setProduct({status:-200});
                        }
                    } else {
                        alertToggle(true, "검색 할 수 없는 주소입니다.");    
                    }
                } else {
                    alertToggle(true, "상품의 주소값이 형식에 맞지 않습니다.");
                }
            } catch(err) {
                alertToggle(true, "잠시 후 다시 시도해주세요.");
            }
        },
        // 검색된 상품의 사이즈 선택
        onSize : function(size, index, e) {
            if(e) e.stopPropagation();
            else return;
            if(select.current.size.value === size) {
                // 같은거 두번쨰 누름 -> 사이즈 선택 취소
                select.current.size.frame.classList.remove("on");
                select.current.size.value = undefined;
            } else {
                let frame = e.target;
                for(let i=0; i<3; ++i) {
                    if(frame.classList.contains("size-element")) break;
                    frame = frame.parentElement;
                }
                if(select.current.size.frame) select.current.size.frame.classList.remove("on");
                else {
                    
                }
                frame.classList.add("on");
                select.current.size.frame = frame;
                select.current.size.value = size;
                select.current.size.index = index;
            }
            event.applyToggle();
        },
        applyToggle : () => {
            if(!applyBtn.current) return;
            const data = select.current;
            const toggle = (() => {
                if(data.option.value === "false") {
                    return true;
                } else if (data.option.value === "true"){
                    if(data.size.value !== undefined) {
                        return true;
                    } else return false;
                } else {
                    // option.value === undefined
                    return false;
                }
            })();
            applyBtn.current.classList.toggle("off", !toggle);
            return toggle;
        },
        apply : () => {
            if(event.applyToggle()) {
                if(select.current.option.value === "false") {
                    // 아니요, 모르겠어요.
                    setData({info:{},size:{}});
                    setStep(2);
                } else if(select.current.option.value === "true") {
                    if(select.current.size.value !== undefined) {
                        if(product && product.praw) {
                            const __data = JSON.parse(JSON.stringify(data));
                            __data.praw = product.praw;
                            __data.info = product.info;
                            __data.size = product.size[select.current.size.index];
                            console.log("저장 데이터 : ",data);
                            setData(__data);
                            setStep(3);
                        }       
                    } else {
                        // 오류 -> '네, 알고있어요.' 선택 후 사이즈 선택 안하고 다음단계 이벤트 활성화
                    }
                } else {
                    // 둘중 아무것도 선택하지 않고 다음단계 활성화
                }
            }
        }
    }
    console.log(select);
    useEffect(() => {
        const fetch = async () => {
            if(data && data.praw && data.praw.full) await event.productSearch();
        }
        fetch();
    }, []);
    useEffect(() => {
        if(sizeListFrame.current) {
            try {
                if(product.praw.full === data.praw.full) {
                    const frame = sizeListFrame.current.querySelectorAll(`input[type='hidden']`);
                    
                    if(frame) {
                        const size = data.size.name;
                        for(const index in frame) {
                            if(frame[index].value === size) {
                                select.current.size.value = size;
                                select.current.size.frame = frame[index].parentElement;
                                select.current.size.index = index;

                                frame[index].parentElement.classList.add("on");

                                select.current.option.value="true";
                                select.current.option.frame = productInputWrapper.current ? productInputWrapper.current : null;
                                break;
                            }
                        }
                    }
                } else {
                    const frame = sizeListFrame.current.querySelector(`.size-element.on`);
                    console.log("ON Frame : ", frame);
                    if(frame) frame.classList.remove("on");
                }
            } catch{}
            
        }
    }, [product]);
    return (
        <>
            <header>
                <h1>상품 주소를 아시나요?</h1>
                <p>상품의 인터넷 주소를 복사/붙여넣기</p>
                <p>보다 쉽게 "나의 상품"을 채워보세요.</p>
            </header>
            <ul className="help-wrapper">
                <li>
                    <i className="material-icons">help_outline</i>
                    <div>
                        <p>내 옷의 치수를 직접 제어보세요.</p>
                        <p>귀찮음은 잠깐, 편리함은 계속!</p>
                    </div>
                </li>
            </ul>
            <main>
                <div className={`selectOption ${(data && data.praw) ? "on" : null}`} ref={productInputWrapper}>
                    <input type="hidden" value="true" />
                    <p onClick={(e) => event.onSelect(e)}>네, 알고있어요.</p>
                    <div>
                        <div className="select-column-wrapper">
                            <div className="row-input-frame">
                                <input 
                                    type="text"
                                    ref={productInput}
                                    onKeyPress={(e) => e.key === "Enter" ? event.productSearch() : null}
                                    autoComplete="off"
                                    placeholder="http://"
                                    defaultValue={(data && data.praw && data.praw.full) ? `${data.praw.full}` : ''}
                                />
                                <i className="material-icons" onClick={() => event.productSearch()}>search</i>
                            </div>
                            {
                                (product && product.size) ? (
                                    <>
                                        <p>상품의 사이즈를 선택해주세요.</p>
                                        <div className="shop-info-frame">
                                            <p>{product.info.sname}</p>
                                            <h1>{product.info.pname}</h1>
                                        </div>
                                        <ul ref={sizeListFrame}>
                                            {product.size.map((element,index) => (
                                                <li key={index} className="size-element" onClick={(e) => event.onSize(element.name, index, e)}>
                                                    <p>{element.name}</p>
                                                    <input type="hidden" value={element.name}></input>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (product && product.status === 404) ? (
                                    <div className="no-data">
                                        <i className="material-icons">sentiment_very_dissatisfied</i>
                                        <p>입력하신 상품 정보가 아직 없어요.</p>
                                    </div>
                                ) : null
                            }   
                        </div>
                    </div>
                </div>
                <div className="selectOption">
                    <input type="hidden" value="false" />
                    <p onClick={(e) => event.onSelect(e)}>아니요, 모르겠어요.</p>
                </div>
                <div className="apply" >
                    <h1 ref={applyBtn} onClick={() => event.apply()}>다음단계</h1>
                </div>
            </main>
        </>
    )
}

export default Step1;