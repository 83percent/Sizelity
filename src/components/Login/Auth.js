import { useCookies } from "react-cookie";
import { useLocation } from "react-router";

import { ServerContext, LoginContext } from "../../App";
import AccountModule from '../..//contents/js/Account';
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";


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
        if(valid) {
            try {
                const {sizelity_token} = cookie;
//                setCookie('sizelity_token', valid, {path: '/', domain: 'sizelity.com', maxAge:(500 * 24 * 60 * 60)});
                setCookie('sizelity_token', valid, {path: '/'});

                localStorage.setItem(TOKEN_NAME, valid);
                const response = await accountModule.autoLogin();
                

                if(response?._id) setUserInfo(response);
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
            <Link to="/" style={{width: "18rem", textAlign: "center", cursor: "pointer", padding: "1rem", backgroundColor: "#00966B", color: "#ffffff"}}>메인으로</Link>
        </div>
    );
}
export default Auth;