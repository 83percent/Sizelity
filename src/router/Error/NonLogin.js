import { Link } from "react-router-dom"

const NonLogin = ({history}) => {
    /*
        로그인 -Link 가 아닌 Replace로 이동시켜야함 : 그래야지 로그인 하고 뒤로가기가 바로 보고있던 페이지로 감
    */
    
    return  (
        <section className="Error">
            <div>
                <i className="material-icons">lock</i>
                <h1>로그인이 필요합니다.</h1>
                <p></p>
                <button onClick={() => history.replace('/login')}>로그인</button>
            </div>
        </section>
    )
}

export default NonLogin;