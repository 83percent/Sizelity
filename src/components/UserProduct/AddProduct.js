import { useContext, useMemo, useRef, useState } from 'react';
import Transition from '../../contents/js/TransitionSizeName';
import axios from 'axios';
import UserProductModule from '../../contents/js/UserProduct';

// CSS
import '../../contents/css/UserProduct/AddProduct.css';
import '../../contents/css/Nav/Alert.css'

// Component
import Step from './StepRouter';
import Confirm from '../Nav/Confirm';

// Context
import { ServerContext, MediaContext} from '../../App';


let transition = null;
const AddProduct = ({history, location}) => {
    // state
    const [data, setData] = useState((location.state?.data?._id) ? location.state.data : {info:{nick:undefined},size:{}});
    const [step, setStep] = useState(data?._id ? 2 : 1);

    // Context
    const server = useContext(ServerContext);
    const media = useContext(MediaContext);

    // useMemo
    const isModify = useMemo(() => {
        return (location?.state?.mode === 'modify')
    }, [location]);

    const userProductModule = useMemo(() => {
        return new UserProductModule(server);
    }, [server])

    // Field
    if(!transition) transition = new Transition("KOR");

    /*
        Step
        1 : 상품 주소 여부
        2 : 상품의 타입
        3 : 사이즈
        4 : Nick
    */
    // ref
    const alertWrapper = useRef(null);
    const saveConfirmWrapper = useRef(null);
    const cancelConfirmWrapper = useRef(null);

    const alert = {
        // type : error || normal || clear
        toggle : (force, msg, type) => {
            const cl = alertWrapper.current.classList;
            if(force === true) {
                if(['error', 'normal', 'clear'].includes(type)) {
                    const title = alertWrapper.current.querySelector("p.title");
                    if(title) {
                        title.innerHTML = msg;
                        title.classList.remove('error', 'normal', 'clear');
                        title.classList.add(type);
                    }
                }
                cl.add("on");
            } else {
                cl.remove("on");
            }
        }
    }
    const confirm = {
        cancelToggle : function(force) {
            if(force) {
                cancelConfirmWrapper.current.classList.add("active");
                setTimeout(() => {cancelConfirmWrapper.current.querySelector("article").classList.add("active");},50);
            } else {
                cancelConfirmWrapper.current.querySelector("article").classList.remove("active");
                cancelConfirmWrapper.current.classList.remove("active");
            }
        },
        saveToggle: function(force) {
            if(force) {
                saveConfirmWrapper.current.classList.add("active");
                setTimeout(() => {saveConfirmWrapper.current.querySelector("article").classList.add("active");},50);
            } else {
                saveConfirmWrapper.current.querySelector("article").classList.remove("active");
                saveConfirmWrapper.current.classList.remove("active");
            }
        },
        toggle : (force, target) => {
            if(!target.current || target === undefined) return;
            if(force === undefined) force = !target.current.classList.contains("on");
            target.current.classList.toggle("on", force);
        }
    }
    const send = {
        save : function() {
            confirm.saveToggle(true);
        },
        saveSend : async function() {
            let response = null;
            
            const {nick, pname, ptype, subtype} = data.info;
            if(!(nick || pname)) return;
            if(!(ptype && subtype)) return;
            if(!data?.size || Object.entries(data?.size).length <= 1) {return;} //최소 사이즈명과 하나의 사이즈 정보가 있어야함.

            if(isModify) {
                response = await userProductModule.patch(data);
            } else {
                response = await userProductModule.set(data);
            }
            console.log(response);
            confirm.saveToggle(false);
            switch(response?.type) {
                case 'success' : {
                    history.replace("/closet", {callback : {
                        type: isModify ? "modify" : "create",
                        state : true
                    }});
                    break;
                }
                case 'error' : {
                    alert.toggle(true, response.error, 'error');
                    break;
                }
                default : {
                    alert.toggle(true, "문제가 발생했어요", 'error');
                    break;
                }
            }
        }
    }
    return  (
        <section id="AddProduct">
            <article className="confirm" ref={cancelConfirmWrapper}>
                <Confirm 
                    cate="종료"
                    title={isModify ? "상품 수정을 종료합니다" : "상품 추가를 종료합니다."}
                    passText="종료"
                    passColor="#dd1818"
                    passAction={history.goBack}
                    cancelText="취소"
                    cancelColor="#000000"
                    cancelAction={() => confirm.cancelToggle(false)}
                />
            </article>
            <article className="confirm" ref={saveConfirmWrapper}>
                <Confirm 
                    cate="저장"
                    title={isModify ? "옷 정보를 수정할까요?" : "옷장에 추가할까요?"}
                    passText={isModify ? "수정": "추가"}
                    passColor="#00966B"
                    passAction={() => send.saveSend()}
                    cancelText="취소"
                    cancelColor="#000000"
                    cancelAction={() => confirm.saveToggle(false)}
                />
            </article>


            <div id="alert-wrapper" ref={alertWrapper}>
                <div>
                    <p className="title"></p>
                </div>
                {
                    media === "Desktops" ?
                    <aside onClick={() => alert.toggle(false)}></aside> :
                    <aside onTouchStart={() => alert.toggle(false)}></aside>
                }
            </div>

            <article>
                <i className="material-icons" onClick={() => confirm.cancelToggle(true)}>close</i>
                <Step 
                    data={data}
                    setData={setData}
                    step={step}
                    setStep={setStep}
                    alertToggle={alert.toggle}
                    save={send.save}
                />
            </article>

            <footer>

                <div className="control-wrapper">
                    {
                        step > 2 ? (
                            <button onClick={() => setStep(step-1)}>이전단계</button>
                        ) : null
                    }
                    <div>
                        <div className={`dot ${step > 1 ? "on" : ""}`}></div>
                        <div className={`dot ${step > 2 ? "on" : ""}`}></div>
                        <div className={`dot ${step > 3 ? "on" : ""}`}></div>
                    </div>
                </div>

                <div className="preview-wrapper">
                    <div>
                        <p>{isModify ? "수정 중" : "추가 중"}</p>
                    </div>
                    <nav className='myProductNav'>
                        <div className="product-wrapper">
                            <div className="size">
                                {data.size.name ? <p>{data.size.name}</p> : null}
                            </div>
                            <div className="info">
                                <p>{data.info.sname ? data.info.sname : null}</p>
                                <h1>{data.info.nick ? data.info.nick : data.info.pname ? data.info.pname : null}</h1>
                                <div>
                                    <p>{data.info.ptype ? transition.getCate(data.info.ptype) : null}</p>
                                    {data.info.subtype ? <><b>/</b><p>{data.info.subtype}</p></> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

            </footer>

        </section>
    )
}


/*
    data = {
        info : { 
            sname : String, 
            pname : String, -- sub : nick || pname = true
            nick : String, -- sub : nick || pname = true
            ptype : String, --require
            subType : String --require
        },
        praw : {
            domain : String,
            type : String,
            code : String,
            full : String
        },
        size : { --require
            name : String,
            ...
        }
    }
*/
export default AddProduct;