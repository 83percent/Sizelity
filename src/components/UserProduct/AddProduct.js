import { useRef, useState } from 'react';
import Transition from '../../contents/js/TransitionSizeName';

// CSS
import '../../contents/css/UserProduct/AddProduct.css';

// Component
import Step from './StepRouter';

let transition = null;
const AddProduct = ({history, location}) => {
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
    // state
    const [data, setData] = useState((location.state && location.state._id) ? location.state : {info:{nick:undefined},size:{}});
    const [step, setStep] = useState((data && data._id) ? 2 : 1);

    // Field
    if(!transition) transition = new Transition("KOR");

    const canSave = ((data) => {
        try {
            if(!data.info.nick && !data.info.pname) return false;
            if(!data.info.ptype) return false;
            if(data.info.pname) {
                if(!data.info.sname) return false;
                if(!data.praw.domain || !data.praw.code || !data.praw.full) return false;
            }
            if(!data.size.name) return false;
            else {
                if(Object.entries(data.size).length < 2) return false;
            }
            return true;
        } catch {return false;}
    })(data);
    /*
        Step
        1 : 상품 주소 여부
        2 : 상품의 타입
        3 : 사이즈
        4 : Nick
    */
    // ref
    const navWrapper = useRef(null);
    const navigation = useRef(null);
    const alertWrapper = useRef(null);
    const confirmOutWrapper = useRef(null);
    const confirmSaveWrapper = useRef(null);

    const alert = {
        toggle : (force, msg) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contains("on");
            if(force && msg !== undefined) {
                alertWrapper.current.querySelector("p").innerHTML = msg;
            }
            alertWrapper.current.classList.toggle("on",force);
        }
    }
    const confirm = {
        toggle : (force, target) => {
            if(!target.current || target === undefined) return;
            if(force === undefined) force = !target.current.classList.contains("on");
            target.current.classList.toggle("on", force);
        }
    }
    const event = {
        save : () => {
            confirm.toggle(true, confirmSaveWrapper);
        }
    }
    return  (
        <section id="AddProduct">
            <div className="confirm-wrapper" ref={confirmOutWrapper}>
                <div className="confirm-closer" onClick={() => confirm.toggle(false, confirmOutWrapper)}></div>
                <div className="confirm-frame">
                    <h1>상품 추가를 <q style={{color:"#ff0000", margin:"0 0.3rem"}}>종료</q>합니다.</h1>
                    <div>
                        <div onClick={() => history.goBack()}><b style={{color:"#ff0000"}}>나가기</b></div>
                        <div onClick={() => confirm.toggle(false, confirmOutWrapper)}>취소</div>
                    </div>
                </div>
            </div>
            <div className="confirm-wrapper" ref={confirmSaveWrapper}>
                <div className="confirm-closer" onClick={() => confirm.toggle(false, confirmSaveWrapper)}></div>
                <div className="confirm-frame">
                    <h1>입력한 <q style={{color:"#00966B", margin:"0 0.3rem"}}>저장</q>할까요?</h1>
                    <div>
                        <div onClick={() => event.save()}><b style={{color:"#00966B"}}>저장</b></div>
                        <div onClick={() => confirm.toggle(false, confirmSaveWrapper)}>취소</div>
                    </div>
                </div>
            </div>
            <div className="closer" onClick={() => confirm.toggle(true, confirmOutWrapper)}>
                <i className="material-icons">close</i>
            </div>
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame">
                    <p></p>
                </div>
                <div className="alert-closer" onClick={() => alert.toggle(false)}></div>
            </div>
            <article>
                <Step 
                    data={data}
                    setData={setData}
                    step={step}
                    setStep={setStep}
                    alertToggle={alert.toggle}
                    save={event.save}
                />
            </article>
            <footer>
                <div className="control-wrapper">
                    <button onClick={(e) => setStep(step-1)} className={step <= 2 ? "off" : null}>이전단계</button>
                    <div>
                        <div className={`dot ${step > 0 ? "on" : null}`}></div>
                        <div className={`dot ${step > 1 ? "on" : null}`}></div>
                        <div className={`dot ${step > 2 ? "on" : null}`}></div>
                        <div className={`dot ${step > 3 ? "on" : null}`}></div>
                    </div>
                    <button className="off">다음단계</button>
                </div>
                <div ref={navWrapper} className="nav-wrapper" onClick={() => canSave ? confirm.toggle(true, confirmSaveWrapper) : undefined}>
                    <div className={`status ${canSave ? "save" : null}`}>
                        <p>{canSave ? "이곳을 누르시면 저장 가능합니다." : "작성중"}</p>
                    </div>
                    <nav className={`myProductNav ${canSave ? "save" : null}`} ref={navigation} >
                        <div className="size">
                            {data.size.name ? <p>{data.size.name}</p> : null}
                        </div>
                        <div className="info">
                            <p>{data.info.sname ? data.info.sname : null}</p>
                            <h1>{data.info.nick ? data.info.nick : data.info.pname ? data.info.pname : null}</h1>
                            <h2>{data.info.nick && data.info.pname ? data.info.pname : null}</h2>
                            <div>
                                <p>{data.info.ptype ? transition.getCate(data.info.ptype) : null}</p>
                                {data.info.subtype ? <><b>/</b><p>{data.info.subtype}</p></> : null}
                            </div>
                        </div>
                    </nav>
                </div>
            </footer>
        </section>
    )
}
export default AddProduct;