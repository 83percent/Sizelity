import { useState } from 'react';
import '../../../contents/css/Manual/Manual_Add_1.css';

const Step1Manual = () => {
    const [step, setStep] = useState(1);

    function next() {
        setStep(step+1);
    }
    if(step !== 5) {
        return (
            <article id="manual" className="add_step1">
                <ManualStep step={step} next={next} />
            </article>
        )    
    } else return null;
    
}

const ManualStep = ({step, next}) => {
    switch(step) {
        case 1 : {
            return (
                <div id="step" className="step1">
                    <h1><strong>옷장에 옷 추가 방법</strong></h1>
                    <h1>을 알아볼까요?</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 2 : {
            return (
                <div id="step" className="step1">
                    <h1>구매했던 상품의</h1>
                    <h1><strong>상세 페이지 주소를 입력.</strong></h1>
                    <h1>사이즈 정보가 있다면</h1>
                    <h1>바로 추가 가능!</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 3 : {
            return (
                <div id="step" className="step1">
                    <h1>구매했던 상품의</h1>
                    <h1>상세 페이지를 찾을 수 없거나,</h1>
                    <h1>사이즈 정보가 없다면</h1>
                    <h1>직접 <strong>치수를 측정 및 입력</strong></h1>
                    <h1><strong>을 통해 추가</strong>할 수 있어요.</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 4 : {
            return (
                <div id="step" className="step1">
                    <h1>Tip)</h1>
                    <h1>원하는 옷의 치수를 입력해</h1>
                    <h1><strong>가상의 옷을 만들어보세요.</strong></h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">check</i>
                    </div>
                </div>
            )
        }
        default : return null;
    }
}

export default Step1Manual;