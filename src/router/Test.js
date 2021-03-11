import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SizelityURL from '../contents/js/URL';

const Test = ({history}) => {
    const sampleCase = [
        "https://www.byslim.com/product/%EB%8B%B9%EC%9D%BC%EB%B0%9C%EC%86%A1-%EC%BD%94%EB%94%94%EB%A7%8C%EB%8A%A5-%EA%B8%B4%ED%8C%94%ED%8B%B0mu/19486/category/1/display/6/",
        "https://byslim.com/product/%EC%BD%94%ED%8C%85-%ED%97%A4%EB%B9%84-%ED%8A%B8%EB%9F%AC%EC%BB%A4%EC%88%8F%EC%9E%AC%ED%82%B7ot/23644/category/683/display/1/",
        "https://byslim.com/product/%ED%8A%B8%EC%9C%8C%EC%8A%A4%ED%8A%B8%EB%A6%BF-%EC%B9%B4%EA%B3%A0-%EC%A1%B0%EA%B1%B0%EB%B0%B4%EB%94%A9%EB%B0%94%EC%A7%80/23627/category/683/display/1/",
        "https://www.hiver.co.kr/products/28508426", // products
        "https://www.w3schools.com/cssref/css_selectors.asp",
        "https://www.hiver.co.kr/products/28549822", 
        "https://mr-s.co.kr/product/%EA%B3%A0%ED%85%90-%ED%8A%B8%EB%A0%8C%EC%B9%98-%EB%A1%B1%EC%BD%94%ED%8A%B8/39702/category/1/display/13/",
        "https://mr-s.co.kr/product/11-%EB%8D%B0%EC%9D%B4-%EC%99%80%EC%9D%B4%EB%93%9C-%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D-%EC%85%8B%EC%97%85/39672/category/1/display/2/",
        "https://www.zardins.com/product/detail.html?product_no=4518&cate_no=1&display_group=4", // product_no
        "https://www.zardins.com/product/detail.html?product_no=5212&cate_no=1&display_group=3",
        "http://superstari.co.kr/shop/shopdetail.html?branduid=142447&xcode=044&mcode=001&scode=&special=3&GfDT=bmp8W10%3D", // branduid
        "http://www.okkane.co.kr/shop/shopdetail.html?branduid=132910&xcode=102&mcode=000&scode=&special=1&GfDT=bml0W10%3D",
        "http://www.okkane.co.kr/shop/shopdetail.html?branduid=129768&xcode=101&mcode=000&scode=&special=1&GfDT=Zm93UFw%3D",
        "https://www.meosidda.com/product/%EB%88%84%EA%B5%AC%EB%82%98-%ED%8E%B8%ED%95%98%EA%B2%8C-%EC%A6%90%EA%B2%A8%EC%9E%85%EB%8A%94-%EB%AC%B4%EC%A7%80%EB%A7%A8%ED%88%AC%EB%A7%A8/30969/category/1/display/2/", // product
        "https://www.meosidda.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC-%EB%A9%B4%EC%8A%A4%ED%8C%90-%EC%B9%B4%EA%B3%A0-%EC%A1%B0%EA%B1%B0%ED%8C%AC%EC%B8%A0/37335/category/1/display/2/",
        "http://lookple.com/product/%EB%A3%A9-%EB%8D%B0%EC%9D%B4%ED%94%84-%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98-%EB%9D%BC%EC%9A%B4%EB%93%9C%EB%8B%88%ED%8A%B8/4452/category/1/display/3/",
        "http://zoozoom.co.kr/shop/shopdetail.html?branduid=164011&xcode=008&mcode=001&scode=&GfDT=Z253UA%3D%3D",
        "https://blog.naver.com/guswjd0407/222250474168",
        "https://fn3995.tistory.com/128",
        "https://hub.zum.com/daily/42307",
        "https://yongmat.tistory.com/244?category=735709",
        "https://smartstore.naver.com/cookierun/products/5346983325",
        "https://smartstore.naver.com/kdgbook/products/5375407225?NaPm=ct%3Dklgwsn8w%7Cci%3D551c6b90ffff31118e8408efa716e5c254c71479%7Ctr%3Dslsl%7Csn%3D531617%7Chk%3D060e0352d7339f3444dab6d0d84af39f268e016e",
        "https://m.blog.naver.com/yoorican/221281164058",
        "https://m.blog.naver.com/PostView.nhn?blogId=star76a&logNo=220096989645&proxyReferer=https:%2F%2Fwww.google.com%2F",
        "https://sanglae.tistory.com/m/209",
        "https://www.loveparis.net/product/new20000%EC%9B%90%ED%95%A0%EC%9D%B8-223%ED%99%94%EB%B6%80%ED%84%B0-%EC%A0%95%EC%83%81%EA%B0%80169000%EC%9B%90%EC%9B%A8%EC%9D%B4%EB%B8%8C-%EB%B2%84%ED%8A%BC-%EB%A0%88%EB%8D%94%EC%9E%90%EC%BC%93/16011/category/1/display/3&cafe_mkt=nms_c02?NaPm=ct%3Dklgww3h4%7Cci%3Dd5d8ff715a1d19ced2a05baddbacda62b6bf0f96%7Ctr%3Dwsp%7Csn%3D19686%7Chk%3D4e2e2db88bb98ca6a327ae7ccaca813e7da6174a"
    ];
    const [{test},setCookies] = useCookies([]);
    
    useEffect(() => {setCookies("test",{test:"테스트"},{path:"/"})},[]);
    const cookieTest = () => {
        setCookies("test",{test:"5678"},{path:"/"});
    }
    const url = new SizelityURL();
    for(const element of sampleCase) {
        console.log(url.get(element));
    }
    return (
        <>
            <button onClick={() => history.goBack()}>뒤로가기</button>
            <button onClick={() => cookieTest()}>Cookie Test</button>
        </>
    )
}
export default Test;