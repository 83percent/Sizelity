import { Link } from "react-router-dom"

const NonLogin = () => {
    return  (
        <section className="Error">
            <div>
                <i className="material-icons">lock</i>
                <h1>로그인이 필요합니다.</h1>
                <p></p>
                <Link to="/login">로그인</Link>
            </div>
        </section>
    )
}

export default NonLogin;