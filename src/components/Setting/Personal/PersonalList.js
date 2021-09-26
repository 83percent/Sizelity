import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import AccountModule from '../../../contents/js/Account';
import { useCookies } from 'react-cookie';

// SVG
import {ReactComponent as Female} from '../../../contents/asset/female_24dp.svg';


// Context
import { LoginContext, ServerContext } from "../../../App";

const PersonalList = ({history}) => {
    // State
    const [ userData, setUserData ] = useState(undefined);

    // Context
    const { userInfo, setUserInfo } = useContext(LoginContext);
    const server = useContext(ServerContext);

    // Cookie
    const cookies = useCookies(['sizelity_token']);

    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    // Callback
    const getUserData = useCallback(async () => {
        const response = await accountModule.getUser();
        switch(response.type) {
            case 'success' : {
                setUserData(response.data);
                break;
            }
            case 'error' : {
                window.alert(response.msg);
                break;
            }
            default : {
                window.alert("문제가 발생했습니다.");
            }
        }
    }, [accountModule]);
    
    const event = {
        logout : function() {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                try {
                    console.log(localStorage.getItem('sizelity_token'))
                    console.log(cookies[0]);
                    
                    localStorage.removeItem('sizelity_token');
                    cookies[2]('sizelity_token');

                    history.replace("/");
                    setUserInfo(null);
                } catch {
                    return;
                }
                
            }
            return null;
        },
        initializeCloset : function() {
            if(!window.confirm("'나의 옷장'을 초기화 할까요?\n(주의) 모든 옷이 삭제되며, 되돌릴 수 없습니다.")) return;

        }, // initializeCloset()
        initializeAfter : function() {
            if(!window.confirm("'나중에 볼 상품'을 초기화 할까요>\n(주의) 모든 상품이 삭제되며, 되돌릴 수 없습니다.")) return;
            
        }, // initializeAfter()
    }


    function getGenderName(en_gender) {
        switch(en_gender) {
            case 'male' : {
                return '남자';
            }
            case 'female' : {
                return '여자';
            }
            default : {
                return '';
            }
        }
    }


    useEffect(() => {
        if(userData === undefined) {
            getUserData();
        }
    }, [userData, getUserData])
    if(userData === undefined) {
        return (
           <section id="list-wrapper">
               <div className="loader-frame">
                   <div className="loader"></div>
               </div>
            </section>
        )
    } else {
        return (
            <section id="list-wrapper">
                <header>
                    <h1>내 정보 관리</h1>
                    <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                </header>
                <main className="profile-frame">
                    {
                        userInfo?.gender === 'female' ? (
                            <Female width="4.8rem" height="4.8rem" fill="#888888" style={{marginRight: "1rem"}}/>
                        ) : (
                            <i className='material-icons'>face</i>
                        )
                    }
                    <div>
                        <ProviderIcon provider={userData?.provider}/>
                        <h2>{userInfo?.name} 님</h2>
                    </div>
                </main>
                <main className="list-frame">
                    <div>
                        <h2>내정보 수정</h2>
                        <ul>
                            <li>
                            <Link to={{
                                    pathname : "/setting/user/name",
                                    state : {name : userInfo?.name}
                                }}>
                                    <p>이름</p>
                                    <h4>{userInfo.name}</h4>
                                    <span className="material-icons">arrow_forward_ios</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname : "/setting/user/gender",
                                    state : {gender : userData?.gender}
                                }}>
                                    <p>성별</p>
                                    <h4>{getGenderName(userData?.gender)}</h4>
                                    <span className="material-icons">arrow_forward_ios</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>데이터 초기화</h2>
                        <ul>
                            <li>
                                <button onClick={() => event.initializeCloset()}>
                                    <p>나의 옷장 초기화</p>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => event.initializeAfter()}>
                                    <p>나중에 볼 상품 초기화</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>계정 관리</h2>
                        <ul>
                            <li>
                                <Link to="/setting/user/out">
                                    <p>회원 탈퇴</p>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => event.logout()}>
                                    <p>로그아웃</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </main>
            </section>
        )
    }
    
}

const ProviderIcon = ({provider}) => {
    switch(provider) {
        case 'kakao' : {
            return  (<p style={{backgroundColor:"#FAE100",color:"#3C1E1E"}}>카카오</p>)
        }
        case 'naver' : {
            return  (<p style={{backgroundColor:"#19CE60",color:"#ffffff"}}>네이버</p>)
        }
        case 'facebook' : {
            return  (<p style={{backgroundColor:"#166FE5",color:"#ffffff"}}>페이스북</p>)
        }
        default : {
            return null;
        }
    }
}

export default PersonalList;