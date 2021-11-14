const ServiceList = ({history}) => {
    return (
        <section id="list-wrapper">
            <header>
                <h1>서비스 정보</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <main className="list-frame">
                <div>
                    <ul>
                        <li>
                            <div>
                                <p>서비스 명</p>
                                <h4>사이즈리티</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>서비스 버전</p>
                                <h4>v1.0.1</h4>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>약관 및 정책</h2>
                    <ul>
                        <li>
                            <a href="https://official.sizelity.com/terms/service" target="_blank" rel="noreferrer">
                                <p>서비스 이용약관</p>
                                <span className="material-icons">arrow_forward_ios</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://official.sizelity.com/terms/privacy" target="_blank" rel="noreferrer">
                                <p>개인정보 처리 방침</p>
                                <span className="material-icons">arrow_forward_ios</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>회사 소개</h2>
                    <ul>
                        <li>
                            <div>
                                <p>상호</p>
                                <h4>사이즈리티</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>홈페이지</p>
                                <h4>official.sizelity.com</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>주소</p>
                                <h4>경기도 수원시 권선구 서수원로 589</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>대표자</p>
                                <h4>이재훈</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>사업자 등록 번호</p>
                                <h4>415-38-01034</h4>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>쇼핑몰 등록</h2>
                    <ul>
                        <li>
                            <a href="https://official.sizelity.com/reservation" target="_blank" rel="noreferrer">
                                <p>사이즈리티 홈페이지</p>
                                <span className="material-icons">arrow_forward_ios</span>
                            </a>
                        </li>
                    </ul>
                    
                </div>
            </main>
        </section>
    )
}
export default ServiceList;