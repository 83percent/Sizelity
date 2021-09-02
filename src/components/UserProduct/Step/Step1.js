import { useContext, useEffect, useMemo, useState } from "react";
import URLModule from '../../../contents/js/URL';
import ProductSearchModule from "../../../contents/js/ProductSearch";

// CSS
import '../../../contents/css/UserProduct/Step1.css';

// Context
import {ServerContext} from '../../../App';


const Step1 = ({data, setData, setStep, alertToggle}) => {
    // state
    const [product, setProduct] = useState(null);
    const [isKnow, setIsKnow] = useState(undefined);
    const [activeSize, setActiveSize] = useState(null);

    // Memo
    const __data = useMemo(() => {
        return JSON.parse(JSON.stringify(data));
    }, [data])


    // Context
    const server = useContext(ServerContext);
    
    const event = {
        currentSearch : null,
        urlModule : null,
        productSearchModule : null,
        productSearch : async function(value) {
            if(value.length < 10) {
                alertToggle(true, "입력한 주소가 너무 짧습니다", 'error');
                return;
            }
            try {
                console.log(value);
                const isURL = ((value) => {
                    return (/^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(value);
                })(value);
                if(!isURL) {
                    alertToggle(true, "상품의 주소값이 형식에 맞지 않습니다.", 'error');
                    return;
                }

                if(!this.urlModule) this.urlModule = new URLModule();
                const analyze = this.urlModule.get(value);
                if(!analyze) {
                    alertToggle(true, "검색 할 수 없는 주소입니다.", 'error');   
                    return;
                }
                if(this.currentSearch?.domain === analyze?.domain && this.currentSearch?.code === analyze?.code) return;
                if(product?.praw && product?.praw?.code === analyze.code) return; // 중복된 데이터 검색
                if(!this.productSearchModule) this.productSearchModule = new ProductSearchModule(server);

                const response = await this.productSearchModule.search({
                    domain : analyze.domain,
                    code : analyze.code,
                    url : analyze.full
                }, false);

                this.currentSearch = {
                    domain : analyze.domain,
                    code : analyze.code,
                }
                switch(response.type) {
                    case 'success' : {
                        setProduct(response.data);
                        break;
                    }
                    case 'error' : {
                        alertToggle(true, response.msg, 'error');
                        break;
                    }
                    default : {
                        alertToggle(true, "문제가 발생했어요", 'error');
                        break;
                    }
                }
            } catch {
                alertToggle(true, "문제가 발생했어요", 'error');
            }
        },
        // 검색된 상품의 사이즈 선택
        selectSize : function(target) {
            let frame = document.querySelector(`input.on[name="size"]`);
            frame = frame?.parentElement;
            if(frame?.nodeName === 'LABEL') frame.classList.remove("on");

            frame = target.parentElement;
            if(frame.nodeName !== 'LABEL') return;

            frame.classList.add("on");

            return;
        },
        apply : () => {
            if(isKnow === undefined) return;

            if(isKnow) {
                // '네, 알고있어요'
                let _sizeData = product.size.filter(({name}) => {
                    return name === activeSize;
                });
                if(_sizeData.length === 0) {
                    alertToggle(true, '문제가 발생했어요', 'error');
                    return;
                };
                __data.praw = product.praw;
                __data.info = product.info;
                __data.size = _sizeData[0];
                setData(__data);

            } else {
                // '아니요, 모르겠어요.'
                __data.praw = {};
                setData(__data);
            }
            setStep(2);
        }
    }

    useEffect(() => {
        if(isKnow !== undefined) {
            const button = document.querySelector('button[name="apply"]');
            if(isKnow) {
                if(!activeSize) {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            } else {
                button.disabled = false;
            }
            let frame = document.querySelector(`input[name='url'][value='${isKnow}']`);
            frame = frame?.parentElement;
            if(frame?.nodeName !== 'LABEL') return;
            frame.classList.add("on");
            return () => {
                // 이전 값
                document.querySelector(`input[name='url'][value='${isKnow}']`)?.parentElement.classList.remove('on');
            }
        }
    }, [isKnow, activeSize])

    useEffect(() => {
        if(activeSize) {
            let frame = document.querySelector(`input[name='size'][value='${activeSize}']`);
            frame = frame?.parentElement;
            if(frame?.nodeName !== 'LABEL') return;
            frame.classList.add("on");
            return () => {
                document.querySelector(`input[name="size"][value="${activeSize}"]`)?.parentElement.classList.remove('on');
            }
        }
    }, [activeSize])

    return (
        <>
            <header>
                <h1>상품 주소를 아시나요?</h1>
                <p>구매했던 상품의 상세보기 주소를 알고 있다면, 손쉽게 추가!</p>
                <p>주소를 몰라도 직접 입력해서 추가해보세요</p>
            </header>
            <ul className="help-wrapper">
                <li>
                    <i className="material-icons">help_outline</i>
                    <div>
                        <p>상품 구매 후, 바로 주소를 입력해 내 옷장에 추가해보세요</p>
                    </div>
                </li>
            </ul>
            <main>
                <label>
                    <input type="radio" name="url" value="true"/>
                    <h2 onClick={() => setIsKnow(true) }>
                        <i className="material-icons">check</i>
                        <p>네, 알고있어요.</p>
                    </h2>
                    <div>
                        <>
                            <div className="input-frame">
                                <input 
                                    type="text"
                                    onKeyPress={(e) => e.key === "Enter" ? event.productSearch(e.target.value) : ""}
                                    autoComplete="off"
                                    placeholder="http://"
                                />
                                <i className="material-icons" onClick={(e) => event.productSearch(e.target.parentElement.querySelector('input').value)}>search</i>
                            </div>
                            {
                                (product?.size) ? (
                                    <article>
                                        <p>구매한 사이즈를 선택해주세요.</p>
                                        <div>
                                            <div className="info-frame">
                                                <p>{product.info.sname}</p>
                                                <h1>{product.info.pname}</h1>
                                            </div>
                                            <div className="size-frame">
                                                {product.size.map((element,index) => (
                                                    <label key={index} className="size-element">
                                                        <p>{element.name}</p>
                                                        <input type="radio" name="size" value={element.name} onClick={(e) => setActiveSize(e.target.value)}></input>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                ) : null
                            }   
                        </>
                    </div>
                </label>
                <label>
                    <input type="radio" name="url" value="false" />
                    <h2 onClick={() => setIsKnow(false) }>
                        <i className="material-icons">check</i>
                        <p>아니요, 모르겠어요.</p>
                    </h2>
                </label>
            </main>
            <div className="apply-frame">
                <button name='apply' onClick={() => event.apply()} disabled={isKnow === undefined ? true : false} >다음 단계</button>
            </div>
        </>
    )
}

export default Step1;