import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Context
import { ConfigContext } from '../../App';

// CSS
import '../../contents/css/Manual/Manual_UserProduct.css';

const UserProduct_Manual = ({productDataCount}) => {
    // State
    const [step, setStep] = useState(0);
    
    // Context
    const config = useContext(ConfigContext);
    const [manualOpen, setManualOpen] = useState(() => {
        try {
            if(config?.get()?.manual?.closet) return true;
            else return false;
        } catch(error) {
            console.log(error)
            return false;
        }
    });
    // Memo

    const event = {
        next : function() {
            if(step < 4) {
                setStep(step+1);
            }
        },
        close : function(never) {
            if(never) {
                // menual 아에 안열기 설정
                config.setManualLevel("closet", 0);
            }
            setManualOpen(false);
        }
    }
    if(manualOpen) { // 1 이상
        return (
            <article id="manual">
                <ManualStep
                    step={step}
                    next={event.next}
                    close={event.close}
                    productDataCount={productDataCount}/>
            </article>
        )
    } else {
        return null;
    }
}

const ManualStep = ({step, next, close, productDataCount}) => {
    switch(step) {
        case 0 : {
            return (
                <div id="step" className="step1">
                    <h1>옷장</h1>
                    <p>당신만을 위한 옷장이에요.</p>
                    <p>옷장에 내 옷을 등록해두고 어느 쇼핑몰에서든 옷 구매할 때, 사이즈 비교하고 맞는 사이즈 주문하세요.</p>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 1 : {
            return (
                <div id="step" className="step2">
                    <aside></aside>
                    <div className="focus-wrapper"></div>
                    <div className="text">
                        <h1>나의 옷장에 <strong>옷이 목록이 표시</strong>돼요.</h1>
                        <p>비교할 옷을 눌러, 보고 있던 옷과 비교해보세요.</p>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                </div>
            )
        }
        case 2 : {
            return (
                <div id="step" className="step3">
                    <div className="text">
                        <h1>비교를 위해 <strong>선택된 나의 옷이</strong></h1>
                        <h1>아래 표시돼요.</h1>
                        <div className="next" onClick={() => next()}>
                            <i className="material-icons">arrow_forward</i>
                        </div>
                    </div>
                    <div className="focus-wrapper"></div>
                </div>
            )
        }
        case 3 : {
            if(productDataCount === 0) {
                return (
                    <div id="step" className="step4">
                        <div className="focus-wrapper">
                            <div>
                                <Link to="/closet/create"/>
                                <i className="material-icons">north</i>
                                <p>내 옷장에 옷을 추가해보세요.</p>
                            </div>
                            
                        </div>
                        <div>
                            <div className="text">
                                <h1>옷장에 옷을 추가해볼까요?</h1>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id="step" className="step4">
                        <div className="focus-wrapper">
                            <div>
                                <Link to="/closet/create"/>
                                <i className="material-icons">north</i>
                                <p>내 옷장에 옷을 추가해보세요.</p>
                            </div>
                            
                        </div>
                        <div className="text">
                            <h1>옷장에 <strong>옷을 추가</strong>해볼까요?</h1>
                            <div className="next" onClick={() => next()}>
                                <i className="material-icons">arrow_forward</i>
                            </div>
                        </div>

                    </div>
                )
            }
            
        }
        case 4 : {
            return (
                <div id="step" className="step5">
                    <h1>다음을 위해</h1>
                    <h1><strong>옷 구매 후</strong> 잊지 말고</h1>
                    <h1>옷장에 <strong>옷을 추가</strong>해주세요.</h1>
                    <div className="next" onClick={() => close(false)}>
                        <i className="material-icons">check</i>
                    </div>
                    <button onClick={() => close(true)}>다시 보지 않기</button>
                </div>
            )
        }
        default : {
            return null;
        }
    }
}

export default UserProduct_Manual;