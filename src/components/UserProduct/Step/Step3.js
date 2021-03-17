import Proptype from 'prop-types'

// CSS
import '../../../contents/css/UserProduct/Step3.css';

const Step3 = ({data, setData, setStep, alertToggle}) => {
    return (
        <>
            <header>
                <h1>사이즈 수치입력</h1>
                <p>저장하려는 상품의 사이즈 수치를 입력해주세요.</p>
                
            </header>
            <main>
                
            </main>
        </>
    )
}

Step3.proptype = {
    data : Proptype.object.isRequired,
    setData : Proptype.func.isRequired,
    setStep : Proptype.func.isRequired,
    alertToggle : Proptype.func.isRequired
}

export default Step3;