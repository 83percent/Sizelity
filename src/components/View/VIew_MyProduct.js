import React from 'react';

//CSS
import '../../contents/css/View/View_MyProduct.css';

// Component
import MyProductList from './View_MyProduct_List';

const MyProduct = ({nowType}) => {
    return (
        <section id="myProduct">
            <nav className="myProduct-nav">
                <div>
                    <button><i className="material-icons">close</i><p>닫기</p></button>
                </div>
                <div>
                    <button><i className="material-icons">search</i></button>
                    <button><i className="material-icons">add</i></button>
                    <button><i className="material-icons">refresh</i></button>
                </div>
            </nav>
            <article>
                <MyProductList />
            </article>
        </section>
    )
}

export default React.memo(MyProduct);