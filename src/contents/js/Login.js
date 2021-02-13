export default class Login {
    info = {};
    isLogin() { // Login 여부 확인
        return Boolean;
    }
    setInfo() {
        this.info = {};
    }
    getInfo() {
        return;
    }
    async send(id, password) {
        if(!this.__checkID(id) || !this.__checkPW(password)) {
            // 유효한 아이디, 비밀번호 아님. -> 서버로 전송 안할거임.
            return false;
        }
        let userJson = await this.__getServerLoginInfo(id, password);
        try {
            let userObj = JSON.parse(userJson);
            console.log("User Object : ", userObj);
            return userObj.name.full;
        } catch(e) {
            return null;
        }
    }
    __getServerLoginInfo(id, password) {
        // 로그인 로직을 돌려서 로그인 결과를 저장하고 리턴함
        // 로그인할 시 서버에서의 결과를 가져오는 과정을 표현하기 위해 setTimeout 을 통해 지연시킨뒤 리턴
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let sampleUserJSON = JSON.stringify(sample);
                resolve(sampleUserJSON);
            },2000);
        });
    }
    __checkID() {
        // 정규표현식으로 ID의 패턴이 맞는지 확인
        return true;
    }
    __checkPW() {
        // 비밀번호 정규표현시긍로 확인
        return true;
    }
}
/*
----------- userJson -----------
로그인 정보가 담김 mongoDB JSON 데이터
{
    code : string,
    id : string,
    password : string,
    name : {
        full : string,
        first : string,
        last :  string
    },
    reg_date : string
}
*/
// Sample Data
const sample = {
    code : "U00000001",
    id : "hoonni2709@naver.com",
    password : "Wjddml7738!",
    name : {
        full : "이재훈",
        first : "재훈",
        last :  "이"
    },
    reg_date : "2021-02-04 18:42:00"
}