import {LoginContext} from '../App';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CSS
import '../contents/css/UserProduct.css';
import { useCookies } from 'react-cookie';

const URL = "http://localhost:3001/user/getproduct";
const UsreProduct = ({history}) => {
    // Cookie
    const [{sizelity_myRecently}, setCookie] = useCookies(['sizelity_myRecently']);
    const cookie = sizelity_myRecently;
    console.log(cookie);
    // Context
    const {userInfo} = useContext(LoginContext);
    
    // State
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        console.log("%c Request My Fav Product Data !!", "background: black; color: #fff;");
        if(productData === null) {
            (async () => {
                if(userInfo._id && userInfo.sili_p) {
                    const response = await axios({
                        method: 'post',
                        url: URL,
                        data : {
                            _id : userInfo._id,
                            upwd : userInfo.sili_p
                        }
                    });
                    console.log("SERVER GET USER PRODUCT DATA : ", response.data);
                } else {
                    console.log("%c Request fail", "background: black; color: #fff;");
                    return null;
                }
            })();
        }
    }, [productData]);
    console.log(userInfo);
    return (
        <section id="UserProduct">
            
            <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            
            <header>
                <div className="title">
                    <h1 className="name">{userInfo.name}</h1>
                    <h1>님의 상품</h1>
                </div>
                <div className="addBtn">
                    <i className="material-icons">add</i>
                    <p>추가</p>
                </div>
            </header>
            <article>

            </article>
            <nav>
                {
                    cookie ? (
                        <>
                            <div>
                                <p>{cookie.size.name}</p>
                            </div>
                            <div>
                                <p>{cookie.info.sname}</p>
                                <h1>{cookie.info.pname}</h1>
                                <div>
                                    <p>{cookie.info.ptype}</p>
                                    <b>/</b>
                                    <p>{cookie.info.subtype}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty">
                            <p>다른 상품과 비교할 상품을 골라주세요.</p>
                        </div>
                    )
                }
                
            </nav>
        </section>
    )
}

export default UsreProduct;
