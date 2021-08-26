import { useCookies } from "react-cookie";

const TOKEN_NAME = 'sizelity_token';
const Auth = ({history}) => {
    const [cookie] = useCookies([TOKEN_NAME]);
    const {sizelity_token} = cookie;
    if(sizelity_token) {
        localStorage.setItem(TOKEN_NAME, sizelity_token);
        history.replace("/");
    } else {
        history.replace("/");
    }
    return null;
}
export default Auth;