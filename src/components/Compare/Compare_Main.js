import {useContext, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AfterProduct from '../../contents/js/AfterProduct';
import UserProductModule from '../../contents/js/UserProduct';
import CompareCountModule from '../../contents/js/count/CompareCount';

// CSS
import '../../contents/css/Compare/Compare_Main.css';
import '../../contents/css/Nav/Alert.css';

// Component
import Compare from './Compare_Article';
import NavMyProduct from '../Nav/MyProduct';
import Menu from './Compare_Menu';

// Context
import { MediaContext, LoginContext, ServerContext } from '../../App';

const CompareIndex = ({history, productData}) => {
    // Cookie
    const [{ sizelity_myRecently }] = useCookies([]);

    // Context 
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);

    // memo
    const CompareCount = useMemo(() => {
        return new CompareCountModule(server);
    }, [server]);

    // Ref
    const menuWrapper = useRef(null);
    const favWrapper = useRef(null);
    const afterAlertWrapper = useRef(null);
    const myProductNavWrapper = useRef(null);

    const alert = {
        menu : function() {
            menuWrapper.current.classList.toggle("active");
        },
        favToggle : function(force) {
            if(force) {
                favWrapper.current.classList.add("active");
                setTimeout(() => {favWrapper.current.querySelector("article").classList.add("active");},50);
            } else {
                favWrapper.current.querySelector("article").classList.remove("active");
                favWrapper.current.classList.remove("active");
            }
        },
        navToggle : function(force) {
            if(myProductNavWrapper.current) {
                if(force === undefined) force = !(myProductNavWrapper.current.classList.contains("active"));
                myProductNavWrapper.current.classList.toggle("active", force);
            }
        }, // NavToggle
        // type : ['error', 'normal', 'clear']
        alertToggle : (force, msg, type) => {
            const cl = afterAlertWrapper.current.classList;
            if(force === true) {
                if(['error', 'normal', 'clear'].includes(type)) {
                    const title = afterAlertWrapper.current.querySelector("p.title");
                    if(title) {
                        title.innerHTML = msg;
                        title.classList.remove('error', 'normal', 'clear');
                        title.classList.add(type);
                    }
                }
                cl.add("on");
            } else {
                cl.remove("on");
            }
        }
    }
    // ref={favWrapper} wrapper 에서의  handler object
    const fav = {
        isMyProduct : false,
        userProductModule : null,
        myWardrobe: async function() {
            if(this.isMyProduct) {
                // 해당 상품 추가기록 존재
                alert.favToggle(false);
                alert.alertToggle(true, "이미 추가된 상품입니다.", "normal");
                return;
            }
            try {
                const activeSize = document.querySelector("input[type='radio'][name='select-size']:checked")?.value;
                if(!activeSize) {
                    alert.alertToggle(true, "나의 옷장에 저장하려는 '사이즈를 선택'를 해주세요.", "error");
                    return;
                }
                const saveData = {
                    info : productData.info,
                    praw : productData.praw,
                    size : null
                }
                for(const sizeElement of productData.size) {
                    if(sizeElement.name === activeSize) {
                        saveData.size = sizeElement;
                        break;
                    }
                }
                if(!saveData.size) {
                    alert.alertToggle(true, "문제가 발생했어요", "error");
                    return;
                }
                if(!this.userProductModule) this.userProductModule = new UserProductModule(server);
                const response = await this.userProductModule.set(saveData);
                switch(response.type) {
                    case 'success' : {
                        alert.alertToggle(true, "나의 옷장에 추가하였습니다.", "clear");
                        this.isMyProduct = true
                        break;
                    }
                    case 'error' : {
                        alert.alertToggle(true, response?.msg, 'error');
                        break;
                    }
                    default : {
                        alert.alertToggle(true, "문제가 발생했어요", "error");
                        break;
                    }
                }
            } catch {
                alert.alertToggle(true, "문제가 발생했어요", "error");
            } finally {
                alert.favToggle(false);
            }
        }
    }
    const after = {
        isAfterRequest : false,
        afterProductModule : null,
        set : async function(id) {
            if(this.isAfterRequest) {
                // 해당 페이지에서 한번 요청한적 있음.
                alert.favToggle(false);
                alert.alertToggle(true, "이미 추가된 상품입니다.", "normal");
                return;
            }
            if(!userInfo._id) {
                //  로그인 안된 상태
                alert.alertToggle(true, "로그인 후 이용가능 합니다.", "error");
                return;
            }

            if(!this.afterProductModule) this.afterProductModule = new AfterProduct(server);
            const response = await this.afterProductModule.set(id);
            alert.favToggle(false);
            switch(response.type) {
                case 'success' : {
                    this.isAfterRequest = true;
                    alert.alertToggle(true, "나중에 볼 상품에 추가하였습니다.", "clear");
                    break;
                }

                case 'error' :
                default : {
                    alert.alertToggle(true, response?.msg, "error");
                    break;
                }
            }
        }, // async after.set(id)
    }
    return (
        <div id="View">
            <div id="alert-wrapper" ref={afterAlertWrapper}>
                <div>
                    <p className="title"></p>
                </div>
                {
                    media === "Desktops" ?
                    <aside onClick={() => alert.alertToggle(false)}></aside> :
                    <aside onTouchStart={() => alert.alertToggle(false)}></aside>
                }
            </div>
            <nav id="Compare-nav">
                <div id="Compare-top">
                    <div  id="logo" className="nav-element" >
                        <Link to="/">Sizelity.</Link>
                    </div>
                    <Link to="/search" className="nav-element" >
                        <i className="material-icons">search</i>
                    </Link>
                    <div className="nav-element" onClick={() => alert.favToggle(true)}>
                        <i className="material-icons">bookmark_add</i>
                    </div>
                    <div className="nav-element" onClick={() => menuWrapper.current.classList.add("active")}>
                        <i className="material-icons">menu</i>
                    </div>
                </div>
            </nav>
            <section id="fav-select-wrapper" ref={favWrapper}>
                <article>
                    <div className="title">
                        <h4>상품 저장</h4>
                        <p>지금 보고 있는 상품을 어디에 저장할까요?</p>
                    </div>
                    <div className="btn-wrapper">
                        <button style={{borderRight:"1px solid #dbdbdb"}} onClick={() => fav.myWardrobe()}>
                            <p>나의 옷장</p>
                        </button>
                        <button onClick={() => after.set(productData._id)}>
                            <p>나중에 볼 상품</p>
                        </button>
                    </div>
                </article>
                {
                    (media === "Phone") ?  
                    (<aside onTouchStart={() => alert.favToggle(false)}></aside>) :
                    (<aside onClick={() => alert.favToggle(false)}></aside>)
                }
            </section>
            <section id="Menu" ref={menuWrapper}>
                <Menu 
                    closerEvent={alert.menu}/>
            </section>
            <div id="myProduct-nav-wrapper" className="active" ref={myProductNavWrapper}>
                <NavMyProduct
                    myProductData={sizelity_myRecently}
                    history={history}
                    wrapper={myProductNavWrapper}
                    navToggle={alert.navToggle}/>
            </div>
            <Compare
                productData={productData} 
                myProduct={sizelity_myRecently}
                CompareCount={CompareCount}/>
        </div> 
    );
}
export default CompareIndex;