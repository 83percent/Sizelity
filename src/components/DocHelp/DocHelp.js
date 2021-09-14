// CSS
import '../../contents/css/DocHelp.css';

const DocHelp = () => {
    console.log(window)
    return (
        <main id="doc-frame">
            <i className="material-icons">mood_bad</i>
            <h1>잠깐,</h1>
            <h1>사이즈리티를 시작하기에는</h1>
            <h1>화면 크기가 너무 커요.</h1>
            <div>
                <p>사이즈리티는 아직 모바일에 최적화 되어있어요.</p>
                <p>추후 다른 기기에서 잘 작동하게 바꿔볼게요 :)</p>

            </div>
            <button onClick={() => window.open(window.location.href, 'sizelity',`width=500, height=${window.screen.availHeight-150}, menubar=no, , toolbar=no`)}>팝업으로 시작</button>
            <div>
                <p style={{color: "#dd1818"}}>팝업이 열리지 않을 경우 팝업차단을 해제해주세요.</p>
            </div>
        </main>
    )
}
export default DocHelp;