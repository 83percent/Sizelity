import { useCookies } from "react-cookie";
import { useLocation } from "react-router";

import { ServerContext, LoginContext } from "../../App";
import AccountModule from '../..//contents/js/Account';
import { useCallback, useContext, useEffect, useMemo } from "react";


const TOKEN_NAME = 'sizelity_token';
const Auth = ({history}) => {
    const valid = new URLSearchParams(useLocation().search)?.get("valid");

    // Cookie
    const [cookie, setCookie] = useCookies([TOKEN_NAME]);

    // Context
    const server = useContext(ServerContext);
    const { userInfo, setUserInfo } = useContext(LoginContext);
    
    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    // Callback
    const getUser = useCallback(async (valid) => {
        console.log("Auth.js : getUser() 의 valid 값 : ", valid);
        if(valid) {
            try {
                const {sizelity_token} = cookie;
                console.log("Auth.js : 쿠키 토큰 : ", sizelity_token);
    
                console.log("Auth.js : 쿠키가 존재하지 않아서 cookie에 토큰 생성");
                setCookie('sizelity_token', valid, {path: '/', maxAge:(500 * 24 * 60 * 60)});
                localStorage.setItem(TOKEN_NAME, valid);
                const response = await accountModule.autoLogin();
    
                console.log("getUser 결과 : ", response);
    
                if(response?._id) setUserInfo(response);
                else console.log("저장 실패 : response?._id = ", response?._id);
            } catch(error) {
                console.log("Auth.js : getUser() try Error : ", error);
            }
        }
    }, [accountModule])

    useEffect(() => {
        if(userInfo) history.replace('/');
        else getUser(valid)
    }, [userInfo, history, valid, getUser])
    
    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <a href="/" style={{width: "18rem", textAlign: "center", cursor: "pointer", padding: "1rem", backgroundColor: "#00966B", color: "#ffffff"}}>메인으로</a>
        </div>
    );
}
export default Auth;