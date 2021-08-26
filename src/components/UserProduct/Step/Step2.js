import { useRef } from "react";

const Step2 = ({data, setData, setStep, alertToggle}) => {
    const __data = JSON.parse(JSON.stringify(data));

    const nickInput = useRef(null);
    const nickUnset = useRef(null);

    const event = {
        unsetToggle : () => {
            if(!nickUnset.current || !nickInput.current) return;
            nickInput.current.classList.toggle("off",nickUnset.current.checked);
            nickInput.current.disabled = nickUnset.current.checked;
            const t = nickUnset.current.previousElementSibling;
            t.classList.toggle("on");
            
        },
        apply : () => {
            // unset 일 경우 => pname 존재하야함
            if(__data.praw ? (!nickUnset.current || !nickInput.current) : !nickInput.current) return;
            const isUnset = (__data.praw ? nickUnset.current.checked : false);
            if(isUnset) {
                if(__data.info.pname) {
                    if(__data.info.nick) delete __data.info.nick;
                    setData(__data);
                    setStep(3);
                } else {
                    alertToggle(true, "'상품명으로 표시'로 설정할 수 없습니다.");
                }
            } else {
                // 지정 명칭 존재
                //data.info.nick = nickInput.current.value;
                const __nick = nickInput.current.value;
                console.log(__nick);
                if(__nick.length > 1 && __nick.length < 21) {
                    __data.info.nick = __nick;
                    setData(__data);
                    setStep(3);
                } else {
                    alertToggle(true, "저장할 이름을 만들어주세요.<br />2~20자 입력");
                }
                
            }
        }
    }
    return (
        <>
            <header>
                <h1>어떻게 표시할까요?</h1>
                <p>나중에 알아볼 수 있는 이름을 지어주세요.</p>
                <p>언제든지 수정 가능할 수 있어요.</p>
            </header>
            <main>
                <div className="input-frame">
                    <input
                        type="text"
                        ref={nickInput}
                        autoComplete="off"
                        placeholder="표시할 이름을 만들어주세요."
                        maxLength="20"
                        defaultValue={__data.info.nick ? __data.info.nick : undefined}/>
                    <h2>2~20자 입력.</h2>
                    {
                        __data.info.pname ? (
                            <>
                                <p className="line">OR</p>
                                <label>
                                    <h1>
                                        <i className="material-icons">check</i>
                                        <p>상품명으로 표시할게요.</p>
                                    </h1>
                                    <input type="checkbox" ref={nickUnset} style={{display:"none"}} onChange={() => event.unsetToggle()}/>
                                </label>
                            </>
                        ) : null
                    }
                    
                </div>
                <div className="apply" >
                    <h1 onClick={() => event.apply()}>다음단계</h1>
                </div>
            </main>
        </>
    )
}
export default Step2;