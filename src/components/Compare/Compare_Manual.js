import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Context
import { ConfigContext } from '../../App';

// Css
import '../../contents/css/Compare/Compare_Manual.css';

const CompareManual = ({myProduct}) => {
    // Context
    const config = useContext(ConfigContext);
    
    // State
    const [step, setStep] = useState(0);
    const [manualOpen, setManualOpen] = useState(() => {
        try {
            if(config?.get()?.manual?.compare) return true;
            else return false;
        } catch(error) {
            console.log(error)
            return false;
        }
    });

    const event = {
        next : function() {
            if(step < 8) {
                if(step === 4) {
                    if(!myProduct) setStep(5);
                    else setStep(6);
                    return;
                }
                setStep(step+1);
            }
        },
        close : function(never) {
            if(never) {
                config.setManualLevel("compare", 0);
            }
            setManualOpen(false);
        }
    }

    if(manualOpen) {
        return (
            <article id="manual">
                <ManualStep step={step} next={event.next} close={event.close}/>
            </article>
        );
    } else {
        return null;
    }
    
}

const ManualStep = ({step, next, close}) => {
    switch(step) {
        case 0 : {
            return (
                <div id="step" className="step1">
                    <h1>반가워요.<br />사이즈리티의 <strong>사용법</strong>을 알아볼까요?</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 1: {
            return (
                <div id="step" className="step2">
                    <h1>사이즈리티가 <strong>이전에 구매했던 상품</strong>과 보고 있던 상품의 <strong>사이즈 비교</strong>를 도와줄 거예요.</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 2 : {
            return (
                <div id="step" className="step3">
                    <aside></aside>
                    <div className="focus-wrapper"></div>
                    <div className="text">
                        <h1>보고 있던 상품 정보와 <strong>판매 중인 사이즈 목록</strong>이 표시돼요.</h1>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                </div>
            )
        }
        case 3 : {
            return (
                <div id="step" className="step4"  onClick={() => next()}>
                    <div className="text">
                        <h1>선택한 사이즈와 <strong>내 옷과의 차이</strong>를 확인해보세요.</h1>
                    </div>
                    <div className="focus-wrapper">
                        <div></div>
                    </div>
                </div>
            )
        }
        case 4 : {
            return (
                <div id="step" className="step5">
                    <div className="text">
                        <h1>보고 있는 상품과 <strong>비교 중인 내 옷</strong>이 아래에 표시돼요.</h1>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                    <div className="focus-wrapper"></div>
                </div>
            )
        }
        case 5 : {
            return (
                <div id="step" className="step6">
                    <div className="text">
                        <h1>앗!<br />아직 <strong>비교할 내 옷을 선택</strong>하지 않았군요?</h1>
                        <p onClick={() => next()}>건너뛰기</p>
                        <div>
                            <p>'나의 옷 변경'을 눌러 비교할 옷을 선택해주세요.</p>
                            <i className="material-icons">south</i>
                        </div>
                    </div>
                    <div className="focus-wrapper">
                        <Link to="/closet"/>
                    </div>
                </div>
            )
        }
        case 6 : {
            return (
                <div id="step" className="step7">
                    <div className="focus-wrapper">
                        <div>
                            <div></div>
                            <i className="material-icons">north</i>
                            <p>지금 보고있는 상품 내 옷장에 추가</p>
                            <p>나중에 볼 상품에 추가</p>
                        </div>
                    </div>
                    <div className="text">
                        <h1>옷 구매 후 잊지 말고 <strong>바로 내 옷장에 추가</strong>하세요.</h1>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                </div>
            )
        }
        case 7 : {
            return (
                <div id="step" className="step8">
                    <div className="focus-wrapper">
                        <div>
                            <div></div>
                            <i className="material-icons">north</i>
                            <p>상품 검색</p>
                        </div>
                    </div>
                    <div className="text">
                        <h1>상품 주소로 </h1><h1><strong>상품 검색</strong>하세요.</h1>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                </div>
            )
        }
        case 8 : {
            return (
                <div id="step" className="step9">
                    <h1><strong>사이즈 비교</strong> 시작!</h1>
                    <div className="next" onClick={() => close(false)}>
                        <i className="material-icons">check</i>
                    </div>
                    <button onClick={() => close(true)}>다시보지 않기</button>
                </div>
            )
        }
        default : return null;
    }
}

export default CompareManual;