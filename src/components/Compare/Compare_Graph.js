import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { priority, getSizeRateName } from '../../contents/js/ProductType';

// SVG
import {ReactComponent as Female} from '../../contents/asset/female_24dp.svg';

// Context
import { LoginContext } from "../../App";

const CompareGraphList = ({activeSize, myProductData, productSizeData, compareCounting}) => {
    // Context
    const { userInfo } = useContext(LoginContext);

    // Ref
    const compareCheck = useRef(false);

    // Memo
    const sizeData = useMemo( () => {
        //analyzeData(productSizeData)
        if(productSizeData.constructor !== Array) return false;

        const analyzeResult = {
            size : []
        }
        try {
            // Formating 되야할 사이즈 목록 만들기
            for(const [key] of Object.entries(productSizeData[0])) {
                if(key !== "name") analyzeResult[key] = [];
            }
            
            // Formating 된 Object에 실제 수치를 입력
            for(const index in productSizeData) {
                analyzeResult.size[index] = productSizeData[index].name;
                for(const [key, value] of Object.entries(productSizeData[index])) {
                    if(key !== "name") {

                        if(analyzeResult[key] === undefined) throw new Error(`Analyze Error Can't match "${key}"`); // 상품별로 서로 맞지 않는 수치정보를 가지고있음.\
                        if(value < 0) throw new Error(`${key} value is not accept value.`);

                        analyzeResult[key][index] = value; 
                    }
                }
            }
            
            // 검증 : size 의 length 값이 각기 수치의 length 값과 같아야함.
            const __length = analyzeResult.size.length;
            for(const [key] of Object.entries(analyzeResult)) {
                if(analyzeResult[key].length !== __length) throw new Error(`Analyze size data not complete data. plz change data.`);
            }

            //console.log("%c\t\t\t -> Analyze Data : ", "background:#00966B;color:#ffffff;",analyzeResult);
            return analyzeResult;
        } catch(error) {
            return null;
        }

    }, [productSizeData]);

    const isMatch = useMemo(() => {
        if(!productSizeData || !myProductData) return false;
        const __matchLength = Object.entries(productSizeData[0]).reduce((acc, element) => {
            if(myProductData[element[0]]) acc++;
            return acc;
        }, 0)-1;
        return __matchLength > 0;

    }, [productSizeData, myProductData])

    useEffect(() => {
        if(!activeSize || compareCheck.current === true) return;
        if(isMatch) {
            console.log("카운팅했음")
            compareCounting();
            compareCheck.current = true;
        }
    }, [activeSize, myProductData, isMatch, compareCounting]);
    return (
        <ul className="compare-frame">
            {
                priority.map((sn, index) => {
                    if(!sizeData[sn] || (!myProductData || !myProductData[sn])) return null;
                    return (
                        <li key={index} className="compare-element">
                                <>
                                    <div className="compare-title-frame">
                                        <h1>{getSizeRateName(sn)}</h1>
                                    </div>
                                    <DrawGraphResult
                                        activeSize={activeSize}
                                        myProductData={myProductData ? myProductData[sn]: null}
                                        productSizeData={sizeData[sn]}
                                        productSizeName={sizeData.size}
                                        gender={userInfo?.gender}
                                        />
                                </>
                        </li>
                    )
                })
            }
            {
                priority.map((sn, index) => {
                    if(!sizeData[sn] || (myProductData && myProductData[sn])) return null;
                    return (
                        <li key={index} className="compare-element">
                                <>
                                    <div className="compare-title-frame">
                                        <h1>{getSizeRateName(sn)}</h1>
                                    </div>
                                    <div className="empty-info">
                                        <p>나의 옷에 '{getSizeRateName(sn)}' 수치가 없어요.</p>
                                    </div>
                                </>
                        </li>
                    )
                })
            }
        </ul>
    );
}

const DrawGraphResult = memo(({ activeSize, myProductData, productSizeData, productSizeName, gender}) => {
    let activeRate = null;

    if(activeSize && myProductData) {
        try { activeRate = productSizeData[productSizeName.indexOf(activeSize)]; } catch(e) {}
    }

    //let status = myProductData ? 0 : -4;
    const getGraphData = (myProductData, productSizeData) => {
        const __graphData = [-9];
        let myProductMarking = !myProductData;
        for(let i=0; i< 2*(productSizeData.length); ++i) {
            if(i%2 === 1) {
                // 홀수 line
                __graphData.push(-9);
            } else {
                // 짝수 
                if(myProductData && !myProductMarking) {
                    // 나의 상품 위치 표시
                    const compareValue = myProductData - productSizeData[i/2];
                    if(compareValue > 0) {
                        // pass : mark, line, point
                        __graphData.push(-1, -9, -2);
                    } else if(compareValue === 0) {
                        // Same : mark, line, point.myProduct
                        __graphData.push(-1, -9, 2);
                        myProductMarking = true; // 나의 상품 마킹 완료
                    } else {
                        // before : mark.myProduct, line, point
                        __graphData.push(1, -9 , -2);
                        myProductMarking = true; // 나의 상품 마킹 완료
                    }
                } else {
                    __graphData.push(-1,-9,-2);
                }
            }
        }
        if(!myProductMarking && myProductData) {
            // last active : line, mark.myProduct ,line
            __graphData.push(1, -9);
        } else {
            // last active : line, mark ,line
            __graphData.push(-1, -9);
        }
        return __graphData;
    }
    
    const graphData = useMemo(() => getGraphData(myProductData, productSizeData, activeSize), [myProductData, productSizeData, activeSize]);
    if(activeSize && myProductData) {
        let pointIndex = productSizeName.indexOf(activeSize)*4+3;
        if(graphData[pointIndex] === -2) graphData[pointIndex] = -3;
        else if(graphData[pointIndex] === 2) graphData[pointIndex] = 0;
        
        let myProductIndex = graphData.indexOf(1) > 0 ? graphData.indexOf(1) : graphData.indexOf(2);
        let activeIndex = graphData.indexOf(-3);
        if(myProductIndex !== -1 && activeIndex !== -1) {
            if(myProductIndex - activeIndex > 0) {
                graphData[activeIndex+1] = -4; // left
                for(let i = activeIndex+1; i < myProductIndex; ++i) {if(graphData[i] === -9) graphData[i] = -5;}
            } else {
                graphData[activeIndex] = 3;
                graphData[activeIndex-1] = 4; // right : 현재 오른쪽 방향 화살표
                
                for(let i = myProductIndex+1; i < activeIndex; ++i) {if(graphData[i] === -9) graphData[i] = 5;}
            } 
        }
    }
    return(
        <div className="graph-analyze">
            <div className="Compare-graph">
                {
                    graphData.map((element,index) => {
                        switch(element) {
                            case -9 : { // use
                                return <div key={index} className="line"></div>

                            }
                            case -5 : { // use
                                // Line
                                return <div key={index} className="line minus"></div>
                            }
                            case -4 : { // use
                                return (
                                    <div key={index} className="line minus">
                                        <i className="material-icons left">chevron_left</i>
                                    </div>
                                );
                            }
                            case -3 : {
                                return (
                                    <div key={index} className="point active minus">
                                        <p className="point-sn">{productSizeName[((index+1)/4)-1]}</p>
                                        <p className="point-sr">{productSizeData[((index+1)/4)-1]}</p>
                                        <input type="hidden" name="Compare-size" value={productSizeName[((index+1)/4)-1]}/>
                                        <input type="hidden" name="Compare-rate" value={productSizeData[((index+1)/4)-1]}/>
                                    </div>
                                );
                            }
                            case -2 : {
                                // point
                                return (
                                    <div key={index} className="point">
                                        <p className="point-sn">{productSizeName[((index+1)/4)-1]}</p>
                                        <p className="point-sr">{productSizeData[((index+1)/4)-1]}</p>
                                        <input type="hidden" name="Compare-size" value={productSizeName[((index+1)/4)-1]}/>
                                        <input type="hidden" name="Compare-rate" value={productSizeData[((index+1)/4)-1]}/>
                                    </div>
                                );
                            }
                            case -1 : {
                                // Marking
                                return <div key={index} className="mark"></div>
                            }
                            case 0 : {
                                return (
                                    <div key={index} className="point myProduct active">
                                        <div>
                                            {
                                                gender === 'female' ? (
                                                    <i className="myProduct-mark">
                                                        <Female width="1.7rem" height="1.7rem" fill="#000000"/>
                                                    </i>
                                                ) : (
                                                    <i className="material-icons myProduct-mark">face</i>
                                                )
                                            }
                                        </div>
                                        <p className="point-sr">{productSizeData[((index+1)/4)-1]}</p>
                                        <input type="hidden" name="Compare-size" value={productSizeName[((index+1)/4)-1]}/>
                                        <input type="hidden" name="Compare-rate" value={productSizeData[((index+1)/4)-1]}/>
                                    </div>
                                );
                            }
                            case 1 : {
                                // Marking.myProduct
                                return (
                                    <div key={index} className="mark myProduct">
                                        {
                                            gender === 'female' ? (
                                                <i className="myProduct-mark">
                                                    <Female width="1.7rem" height="1.7rem" fill="#000000"/>
                                                </i>
                                            ) : (
                                                <i className="material-icons myProduct-mark">face</i>
                                            )
                                        }
                                        <p className="mark-sr">{myProductData}</p>
                                    </div>
                                )
                            }
                            case 2 : {
                                // point.myProduct
                                return (
                                    <div key={index} className="point myProduct">
                                        {
                                            gender === 'female' ? (
                                                <i className="myProduct-mark">
                                                    <Female width="1.7rem" height="1.7rem" fill="#000000"/>
                                                </i>
                                            ) : (
                                                <i className="material-icons myProduct-mark">face</i>
                                            )
                                        }
                                        <p className="point-sr">{productSizeData[((index+1)/4)-1]}</p>
                                        <input type="hidden" name="Compare-size" value={productSizeName[((index+1)/4)-1]}/>
                                        <input type="hidden" name="Compare-rate" value={productSizeData[((index+1)/4)-1]}/>
                                    </div>
                                );
                            }
                            case 3 : {
                                return (
                                    <div key={index} className="point active plus">
                                        <p className="point-sn">{productSizeName[((index+1)/4)-1]}</p>
                                        <p className="point-sr">{productSizeData[((index+1)/4)-1]}</p>
                                        <input type="hidden" name="Compare-size" value={productSizeName[((index+1)/4)-1]}/>
                                        <input type="hidden" name="Compare-rate" value={productSizeData[((index+1)/4)-1]}/>
                                    </div>
                                );
                            }
                            case 4 : { // use
                                return (
                                    <div key={index} className="line plus">
                                        <i className="material-icons right">chevron_right</i>
                                    </div>
                                );
                            }
                            case 5 : { // use
                                // Line
                                return <div key={index} className="line plus"></div>
                            }
                            default : {
                                return null;
                            }
                        }
                    })
                }
            </div>
            <CompareResult
                activeRate={activeRate}
                myRate={myProductData} />
        </div>
    );
}); //DrawGraphResult : Component


const CompareResult = memo(({activeRate, myRate}) => {
    if(activeRate && myRate) {
        const value = activeRate - myRate;
        const status = value > 0 ? 1 : value === 0 ? 0 : -1;
        if(status === 1 || status === -1) {
            return (
                <div className="compare-result">
                    <p className={status === 1 ? "rate plus" : status === -1 ? "rate minus" : "none"}>{value}cm</p>
                </div>
            );
        } else if(status === 0) {
            return (
                <div className="compare-result">
                    <div className="result-span">
                        <p className="bold">0cm</p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
        
    } else if(myRate) {
        return (
            <div className="compare-result">
                <p>-</p>
            </div>
        );
    } else {
        return (<div className="compare-result blank"></div>);
    }
});

export default memo(CompareGraphList);


