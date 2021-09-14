import { useEffect, useMemo, useState } from "react";

// CSS
import '../../../contents/css/UserProduct/Step2.css';
const Step2 = ({data, setData, setStep, alertToggle}) => {
    // Memo
    const __data = useMemo(() => {
        return JSON.parse(JSON.stringify(data))
    }, [data]);

    // State
    const [useNickOption, setUseNickOption] = useState(true);
    const [productNick, setProductNick] = useState(__data?.info?.nick || "");

    // Callback

    const event = {
        apply : () => {
            if(useNickOption) {
                // Nick 작성하여 사용
                if(productNick.length < 2 || productNick.length > 30) {
                    alertToggle(true, '표시할 상품 명은 2~20자를 입력해주세요', 'error');
                    return;
                }
                __data.info.nick = String(productNick).trim();
            } else {
                // Nick 사용 안함
                __data.info.nick = undefined;
            }
            setData(__data);
            if(__data?.praw?.full) {
                // 쇼핑몰에서 제공한 상품으로 종류 및 세부 타입 변경 금지
                setStep(4);
            } else {
                setStep(3);
            }
        }
    }

    useEffect(() => {
        const btnFrame = document.querySelector("button[name='apply']");
        const inputFrame = document.querySelector("input[name='inputName']");
        let frame = document.querySelector('input[name="usePname"]');
        
        if(!btnFrame) {return;}

        if(useNickOption) {
            // Nick 작성하여 사용
            if(frame) {
                frame?.parentElement?.classList.remove('on');
            }
            inputFrame.disabled = false;
            if(productNick.length < 2 || productNick.length > 30) {
                btnFrame.disabled = true;
            } else {
                btnFrame.disabled = false;
            }
        } else {
            // Nick 사용 안함
            if(!frame) {return;} else {frame = frame.parentElement;}
            frame?.classList.add('on');
            inputFrame.disabled = true;
            btnFrame.disabled = false;
        }
    }, [useNickOption, productNick]);

    return (
        <>
            <header>
                <h1>어떻게 표시할까요?</h1>
                <p>이 옷을 구분할 수 있는 이름을 만들어주세요.</p>
                <p>특징을 잘 잡아서 입력하면 편할거에요.</p>
            </header>
            <main>
                <div>
                    <div className="input-frame">
                        <input
                            type="text"
                            name="inputName"
                            autoComplete="off"
                            placeholder="표시할 이름을 만들어주세요."
                            maxLength="30"
                            onChange={(e) => setProductNick(e.target.value)}
                            defaultValue={__data?.info?.nick} />
                        <p>{productNick.length}/30</p>
                    </div>
                    {
                        __data?.info.pname ? (
                            <>
                                <label>
                                    <h1>
                                        <i className="material-icons">check</i>
                                        <p>그냥, 상품명으로 표시할게요.</p>
                                    </h1>
                                    <input type="checkbox" name="usePname" style={{display:"none"}} onChange={(e) => setUseNickOption(!e.target.checked)}/>
                                </label>
                            </>
                        ) : null
                    }
                </div>
            </main>
            <div className="apply-frame" >
                <button name="apply" onClick={() => event.apply()}>다음단계</button>
            </div>
        </>
    )
}
export default Step2;