import { useCookies } from "react-cookie";

const TOKEN_NAME = 'sizelity_token';
const Auth = ({history}) => {
    const [cookie] = useCookies([TOKEN_NAME]);
    const {sizelity_token} = cookie;
    console.log(sizelity_token);
    if(sizelity_token) {
        console.log("쿠키 존재 로컬에 저장");
        localStorage.setItem(TOKEN_NAME, sizelity_token);
        history.replace("/");
    } else {
        console.log("쿠키 없음");
        history.replace("/");
    }
    return null;
}
export default Auth;