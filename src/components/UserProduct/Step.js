import axios from "axios";
import { useRef, useState } from "react"
import URLModule from '../../contents/js/URL';

let urlModule = null;
const Step = ({data, setData, step, setStep}) => {
    console.log("Refresh Step Component")
    const __data = JSON.parse(JSON.stringify(data));
    const server = 'http://localhost:3001';
    //const server = 'http://192.168.11.2:3001';
    // Ref

    // 1
    const [product, setProduct] = useState(null);
    const productInput = useRef(null);

    // 4
    const nickInput = useRef(null);
    const nickUnset = useRef(null);

    // Should be Save Checked
    console.log("상품 검색 결과 : ", product);

    const event = {
        step1 : {
            selectOptionFrame : undefined,
            selectOption : undefined,
            onSelect : function(e) {
                if(e) e.stopPropagation();
                else return;
                if(this.selectOptionFrame) {
                    this.selectOptionFrame.classList.remove("on");
                }
                this.selectOptionFrame = e.target;
                for(let i=0; i < 3; ++i) {
                    if(this.selectOptionFrame.classList.contains("selectOption")) {
                        this.selectOptionFrame.classList.add("on");
                        break;
                    }
                    this.selectOptionFrame = this.selectOptionFrame.parentElement;
                }
                this.selectOption = this.selectOptionFrame.querySelector("input[type=hidden]").value;

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
                                console.log(err);
                                return {data:{status:-200}}
                            });
                            if(response.data._id || response.data.status) setProduct(response.data);
                            else {
                                setProduct({status:-200});
                            }
                        }
                    }
                    console.log("값 : ",inputURL)
                    
                } catch(err) {
                    console.log(err)
                }
            },
            selectSize : undefined,
            selectSizeFrame : undefined,
            onSize : function(size, e) {
                if(e) e.stopPropagation();
                else return;
                if(this.selectSize === size) {
                    // 같은거 두번쨰 누름 -> 사이즈 선택 취소
                    this.selectSizeFrame.classList.remove("on");
                    this.selectSize = undefined;
                } else {
                    let frame = e.target;
                    for(let i=0; i<3; ++i) {
                        if(frame.classList.contains("size-element")) break;
                        frame = frame.parentElement;
                    }
                    if(this.selectSizeFrame) this.selectSizeFrame.classList.remove("on");
                    frame.classList.add("on");
                    this.selectSizeFrame = frame;
                    this.selectSize = size;
                }
                
            }
        },
        step4 : {
            unsetToggle : () => {
                if(!nickUnset.current || !nickInput.current) return;
                nickInput.current.classList.toggle("off",nickUnset.current.checked);
                nickInput.current.disabled = nickUnset.current.checked;
                const t = nickUnset.current.previousElementSibling;
                t.classList.toggle("on");
                
            },
            apply : () => {
                console.log("apply")
                // unset 일 경우 => pname 존재하야함

                if(__data.praw ? (!nickUnset.current || !nickInput.current) : !nickInput.current) return;
                const isUnset = (__data.praw ? nickUnset.current.checked : false);
                if(isUnset) {
                    if(__data.info.pname) {
                        if(__data.info.nick) delete __data.info.nick;
                        setData(__data);
                    } else {
                        // 미지정으로 지정할 수 없음.
                    }
                } else {
                    // 지정 명칭 존재
                    //data.info.nick = nickInput.current.value;
                    const __nick = nickInput.current.value;
                    console.log(__nick);
                    if(__nick.length > 1 && __nick.length < 21) {
                        __data.info.nick = __nick;
                        setData(__data);
                    }
                    
                }
            }
        }
    }

    switch(step) {
        case 1 : {
            return (
                <div className="step-wrapper">
                    <header>
                        <h1>상품 주소를 아시나요?</h1>
                        <p>상품의 인터넷 주소를 복사/붙여넣기</p>
                        <p>보다 쉽게 "나의 상품"을 채워보세요.</p>
                    </header>
                    <main>
                        <div className="selectOption">
                            <input type="hidden" value="true" />
                            <p onClick={(e) => event.step1.onSelect(e)}>네, 알고있어요.</p>
                            <div>
                                <div className="select-column-wrapper">
                                    <div className="row-input-frame">
                                        <input type="text" ref={productInput} onKeyPress={(e) => e.key === "Enter" ? event.step1.productSearch() : null} autoComplete="off" placeholder="http://"/>
                                        <i className="material-icons" onClick={() => event.step1.productSearch()}>search</i>
                                    </div>
                                    {
                                        (product && product.size) ? (
                                            <ul>
                                                {product.size.map((element,index) => (
                                                    <li key={index} className="size-element" onClick={(e) => event.step1.onSize(element.name, e)}>
                                                        <p>{element.name}</p>
                                                    </li>
                                                ))}
                                                <li>

                                                </li>
                                            </ul>
                                        ) : null
                                    }   
                                </div>
                            </div>
                        </div>
                        <div className="selectOption">
                            <input type="hidden" value="false" />
                            <p onClick={(e) => event.step1.onSelect(e)}>아니요, 모르겠어요.</p>
                        </div>
                    </main>
                </div>
            )
        }
        case 2 : {
            return (
                <div className="step-wrapper">
                    <header>
                        <h1>어떤 종류인가요?</h1>
                        <p>어떤 종류의 옷인가요?</p>
                        <p>종류별로 정리되어 저장됩니다.</p>
                    </header>
                    <main>
                        
                    </main>
                </div>
            )
        }
        case 3 : {
            return (
                <div className="step-wrapper">
                    <header>
                        <h1>사이즈 수치입력</h1>
                        <p>저장하려는 상품의 사이즈 수치를 입력해주세요.</p>
                        
                    </header>
                    <main>
                        
                    </main>
                </div>
            )
        }
        case 4 : {
            return (
                <div className="step-wrapper">
                    <header>
                        <h1>어떻게 표시할까요?</h1>
                        <p>나중에 알아볼 수 있는 이름을 지어주세요.</p>
                        <p>언제든지 수정 가능할 수 있어요.</p>
                        <p>미지정은 상품명이 존재하는 경우만 사용할 수 있어요.</p>
                    </header>
                    <main>
                        <div className="input-frame">
                            <input type="text" ref={nickInput} autoComplete="off" placeholder="이름을 만들어주세요." maxLength="20" defaultValue={__data.info.nick ? __data.info.nick : undefined}/>
                            <h2>2~20자 사용가능합니다.</h2>
                            {
                                __data.info.pname ? (
                                    <>
                                        <p className="line">OR</p>
                                        <label>
                                            <h1>미지정</h1>
                                            <input type="checkbox" ref={nickUnset} style={{display:"none"}} onChange={() => event.step4.unsetToggle()}/>
                                        </label>
                                    </>
                                ) : null
                            }
                            
                        </div>
                        <div className="apply" >
                            <h1 onClick={() => event.step4.apply()}>적용</h1>
                        </div>
                    </main>
                    
                </div>
            )
        }
    }
}
export default Step;