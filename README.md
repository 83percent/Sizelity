# SIZELIT
> SIZELITY는 쇼핑몰간 경계 없이 고객의 이전 구매 상품과 사이즈 비교를 지원하는 웹 서비스입니다.
> + 소개 홈페이지     :  https://official.sizelity.com/
> + 서비스 홈페이지   :  https://www.sizelity.com

## Front-End
> SPA가 제공하는 빠른 반응성과 사용자 경험을 제공하고자 React.js가 적용되었습니다.
> + React v17.0.2

## Dependencies
> + axios
> + cors
> + dotenv
> + path
> + prop-types
> + react-cookie
> + react-router-dom
> + react-router-sitemap

## 추후 업데이트 내용
### SSR
> SIZELITY의 초기 개발 컨셉은 SIZELITY가 제공하는 상품 검색창에 상품의 주소를 붙여 넣는 방식이였습니다. <br />
> 이후 쇼핑몰에서 제공하는 "SIZELITY 연결 링크 버튼"을 통해 고객이 보고있던 상품을 바로 사이즈 비교할 수 있는 기능을 중심으로 개발을 이어갔습니다. <br />
> 하지만 그 결과 사이즈 비교를 위해 SIZELITY에 접근한 다음 다른 상품을 보기위해 SIZELITY를 벗어나고 이후 다시 SIZELITY에 접근하는 상황이 연출되었으며, 이는 SPA + CSR 방식이 적용된 이 1.0.x 버전에 적용된 기술의 장점인 부드러운 화면전환과 빠른 반응성이 서비스 컨셉에 부합하지 않다는 판단을 내렸습니다.. <br />
> 그리하여 추후 **SSR(Server Side Rendering)** 을 제공할 예정입니다. <br />
> SIZELITY 내부에서의 비교 기준 상품을 변경하는 등의 기존 기능에 대한 네이티브 앱 만큼의 사용자 경험을 위해 SPA 기존 뼈대를 유지할 것입니다. <br />
> 다만 첫 화면을 통해 대부분의 서비스를 제공하는 현 SIZELITY의 컨셉에 맞게 **SSR** 을 통해 첫 화면 렌더링 시간을 단축할 것입니다. 

### Redux 와 TypeScript 를 활용
> SIZELITY React의 상태관리는 Global하게 사용되는 상태는 Context를 활용하여 제공되고 있으며, 이외의 상태들은 컴포넌트를 이용할 때 전달해주고 있습니다.
> 하지만 이렇게 작성된 소스 코드는 유지보수 및 가독성을 낮추는 문제가 발생하였습니다.
> 이후 버전부터, SIZELITY의 유지보수 및 가독성을 높이기 위해 Redux 와 Typescript가 적용됩니다.
