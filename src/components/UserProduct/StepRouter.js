
// CSS
import '../../contents/css/UserProduct/Step.css';

// Component 
import Step1 from './Step/Step1';
import Step2 from './Step/Step2';
import Step3 from './Step/Step3';
import Step4 from './Step/Step4';

const Step = ({data, setData, step, setStep, alertToggle, save}) => {
    switch(step) {
        case 1 : {
            return (
                <div className="step-wrapper step1">
                    <Step1 
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 2 : {
            return (
                <div className="step-wrapper step2">
                    <Step2
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 3 : {
            return (
                <div className="step-wrapper step3">
                    <Step3
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 4 : {
            return (
                <div className="step-wrapper step4">
                    <Step4
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}
                        save={save}/>
                </div>
            )
        }
    }
}
export default Step;