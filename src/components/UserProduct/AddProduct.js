import { useRef, useState } from 'react';
import Transition from '../../contents/js/TransitionSizeName';

// CSS
import '../../contents/css/UserProduct/AddProduct.css';

// Component
import Step from './Step';

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
    const [step, setStep] = useState((data && data._id) ? 4 : 1);

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
    const confirmOutWrapper = useRef(null);
    const confirmSaveWrapper = useRef(null);
    const confirm = {
        toggle : (force, target) => {
            if(!target.current || target === undefined) return;
            if(force === undefined) force = !target.current.classList.contains("on");
            target.current.classList.toggle("on", force);
        }
    }
    const event = {
        save : () => {
            if(canSave) window.alert("저장하시겠습니까?");
        },
        dataChange : (data) => {
            if(navWrapper.current) {
                navWrapper.current.classList.add("c_e");
                setTimeout(()=> {
                    setData(data);
                    navWrapper.current.classList.remove("c_e");
                }, 450);
            } else {
                setData(data);
            }
        }
    }
    console.log("INCOME DATA : ", data);
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
            <article>
                <Step 
                    data={data}
                    setData={event.dataChange}
                    step={step}
                    setStep={setStep}
                />
            </article>
            <footer>
                <div className="control-wrapper">
                    <button onClick={() => step > 1 ? setStep(step-1) : undefined}>이전단계</button>
                    <div>
                        <div className={`dot ${step > 0 ? "on" : null}`}></div>
                        <div className={`dot ${step > 1 ? "on" : null}`}></div>
                        <div className={`dot ${step > 2 ? "on" : null}`}></div>
                        <div className={`dot ${step > 3 ? "on" : null}`}></div>
                    </div>
                    <button onClick={() => step < 4 ? setStep(step+1) : undefined}>다음단계</button>
                </div>
                <div ref={navWrapper} className="nav-wrapper" onClick={() => canSave ? confirm.toggle(true, confirmSaveWrapper) : undefined}>
                    <div className={`status ${canSave ? "save" : null}`}>
                        <p>{canSave ? "여기를 누르시면 저장가능합니다." : "작성중"}</p>
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