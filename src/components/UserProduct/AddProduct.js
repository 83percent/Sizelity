import { useContext, useRef, useState } from 'react';
import Transition from '../../contents/js/TransitionSizeName';

// CSS
import '../../contents/css/UserProduct/AddProduct.css';

// Component
import Step from './StepRouter';
import axios from 'axios';

// Context
import {ServerContext} from '../../App';


let transition = null;
const AddProduct = ({history, location}) => {
console.log(location);
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
    const [data, setData] = useState((location.state?.data?._id) ? location.state.data : {info:{nick:undefined},size:{}});
    const [step, setStep] = useState(data?._id ? 2 : 1);

    // Context
    const server = useContext(ServerContext);

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
        },
        saveSend : async (canSave) => {
            confirm.toggle(false, confirmSaveWrapper);
            if(!canSave) {alert.toggle(true, "입력이 완료되지 않았어요."); return}
            const response = await axios({
                method: location?.state?.mode === "modify" ? "PUT" : "POST", 
                url: server + '/user/product',
                withCredentials: true,
                data: data,
                timeout: 3000
            }).catch((err) => {
                if(!err.response?.status) return {data:{status:500}};
                switch(err.response.status) {
                    case 401 : {
                        return {data:{status:401}};
                    }
                    default : {
                        return {data:{status:500}};
                    }
                }
            });
            if(response?.data?.status) {
                switch(response.data.status) {
                    case 200 : {
                        // 200 변경 성공
                        history.goBack();
                        break;
                    }
                    case -200 : {
                        // -200 변경 실패
                        alert.toggle(true, "서버오류로 인해 변경에 실패하였습니다.");
                        break;
                    }
                    case 404 : {
                        // 404 유저 데이터 찾을 수 없음 UserModel.findById(불가)
                        alert.toggle(true, "잠시 후 다시 요청해주세요.");
                        break;
                    }
                    case -404 : {
                        // -404 요청 데이터 형식을 갖추고 있지 않음
                        alert.toggle(true, "잘못된 접근입니다.");
                        break;
                    }
                    case 401 : {
                        // auth Error
                        alert.toggle(true, "잘못된 접근입니다.");
                        break;
                    }
                    default : {
                        // server Error
                        alert.toggle(true, "잠시 후 다시 요청해주세요.");
                    }
                }
            } else alert.toggle(true, "잠시 후 다시 요청해주세요.");
        }
    }
    return  (
        <section id="AddProduct">
            <div className="confirm-wrapper" ref={confirmOutWrapper}>
                <div className="confirm-closer" onClick={() => confirm.toggle(false, confirmOutWrapper)}></div>
                <div className="confirm-frame">
                    <h1>상품 추가를 <q style={{color:"#ff0000", margin:"0 0.3rem"}}>종료</q>합니다.</h1>
                    <div>
                        <div onClick={() => history.goBack()} style={{color:"#ff0000"}}>종료</div>
                        <div onClick={() => confirm.toggle(false, confirmOutWrapper)}>취소</div>
                    </div>
                </div>
            </div>
            <div className="confirm-wrapper" ref={confirmSaveWrapper}>
                <div className="confirm-closer" onClick={() => confirm.toggle(false, confirmSaveWrapper)}></div>
                <div className="confirm-frame">
                    <h1>입력한 <q style={{color:"#00966B", margin:"0 0.3rem"}}>저장</q>할까요?</h1>
                    <div>
                        <div onClick={() => event.saveSend(canSave)} style={{color:"#00966B"}}>저장</div>
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