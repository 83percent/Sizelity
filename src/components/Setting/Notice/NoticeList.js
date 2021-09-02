const NoticeList = ({history}) => {
    return (
        <section id="list-wrapper">
            <header>
                <h1>공지사항</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
        </section>
    )
}

export default NoticeList;