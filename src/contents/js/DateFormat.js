function get(date) {
    try {
        const _d = new Date(date);
        return `${_d.getFullYear()}-${_d.getMonth() >= 9 ? _d.getMonth()+1 : "0"+(_d.getMonth()+1)}-${_d.getDate() >= 10 ? _d.getDate() : "0"+_d.getDate()}`
        //return `${_d.getFullYear()}-${_d.getMonth()+1}-${_d.getDate()}`
    } catch {
        return null;
    }
}

function eventDay(date) {
    // D-Day 날짜 지정
    const setDate = new Date(date);
    // D-day 날짜의 연,월,일 구하기

    // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
    const now = new Date();

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
    const distance = setDate.getTime() - now.getTime();
    
    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다. 
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    const day = Math.floor(distance/(1000*60*60*24)) + 1;

    if(day === 0) return "곧 마감";
    if(day === 1) return "내일 마감";
    else return `마감 ${day}일 전`;
}

module.exports = {
    get,
    eventDay
}