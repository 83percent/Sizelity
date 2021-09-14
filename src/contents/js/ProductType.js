/*

    2021-08-08 수정 (이재훈)
    : 데이터 추가

    2021-09-13 수정 (이재훈)
    : 우선순위 추가
*/
const supportCate = ["set", 'outer', 'top', 'suit', 'onepiece', 'bottom', 'skirt', 'shoes', 'unknown'];
const ptype = [
    {value : "set", name : "세트"},
    {value : "outer", name : "아우터"},
    {value : "top", name : "상의"},
    {value : "suit", name : "한벌 옷"},
    {value : "onepiece", name : "원피스"},
    {value : "bottom", name : "하의"},
    {value : "skirt", name : "치마"},
    {value : "shoes", name : "신발"}
];

const sizeName = ['XS','S','M','L','XL','직접입력'];
function getTypeName(value) {
    switch(value) {
        case 'set' : return "세트"
        case 'outer' : return "아우터"
        case 'top' : return "상의"
        case 'suit' : return "한벌 옷"
        case 'onepiece' : return "원피스"
        case 'bottom' : return "하의"
        case 'skirt' : return "치마"
        case 'shoes' : return "신발"
        default : return "알 수 없음"
    }

}
const getSizeRateName = function(name) {
    const _d = {
        shoulder : "어깨",
        chest : "가슴",
        sleeve : "소매(팔길이, 팔)",
        arm : "암홀(팔통)",
        T_length : "총길이(상의)",
        waist : "허리",
        crotch : "밑위",
        hips : "엉덩이",
        thigh : "허벅지",
        B_length : "총길이(하의)",
        hem : "밑단",
        calve : "종아리",
        length : "총길이(한벌)",
        height : "높이",
        heel : "굽높이",
        S_width : "발볼",
        S_length : "길이"
    }
    return _d[name];
}

const getSizeRate = (name) => {
    switch(name) {
        case 'set' : {
            return [
                [ "shoulder","어깨"],
                [ "chest","가슴"],
                [ "sleeve","소매(팔길이, 팔)"],
                [ "arm","암홀(팔통)"],
                [ "T_length","총길이(상의)"],
                [ "waist", "허리"],
                [ "crotch", "밑위"],
                [ "hips", "엉덩이"],
                [ "thigh", "허벅지"],
                [ "B_length","총길이(하의)"],
                [ "hem", "밑단"],
                [ "calve", "종아리"]
            ];
        }
        case 'outer' :
        case 'top' : {
            return [
                [ "shoulder","어깨"],
                [ "chest","가슴"],
                [ "sleeve","소매(팔길이, 팔)"],
                [ "arm","암홀(팔통)"],
                [ "T_length","총길이"]
            ];
        }
        case 'suit' : {
            return [
                [ "shoulder","어깨"],
                [ "chest","가슴"],
                [ "sleeve","소매(팔길이, 팔)"],
                [ "arm","암홀(팔통)"],
                [ "waist", "허리"],
                [ "hips", "엉덩이"],
                [ "thigh", "허벅지"],
                [ "hem", "밑단"],
                [ "calve", "종아리"],
                [ "length","총길이"]
            ];
        }
        case 'onepiece' : {
            return [
                [ "shoulder","어깨"],
                [ "chest","가슴"],
                [ "sleeve","소매(팔길이, 팔)"],
                [ "arm","암홀(팔통)"],
                [ "waist", "허리"],
                [ "hem", "밑단"],
                [ "length","총길이"]
            ];
        }
        case 'bottom' : {
            return [
                [ "waist", "허리"],
                [ "crotch", "밑위"],
                [ "hips", "엉덩이"],
                [ "thigh", "허벅지"],
                [ "B_length","총길이"],
                [ "hem", "밑단"],
                [ "calve", "종아리"]
            ];
        }
        case 'skirt' : {
            return [
                [ "waist", "허리"],
                [ "hips", "엉덩이"],
                [ "B_length","총길이"],
                [ "hem", "밑단"]
            ];
        }
        case 'shoes' : {
            return [
                [ "height", "높이"],
                [ "heel", "굽높이"],
                [ "S_width", "발볼"],
                [ "S_length", "길이"]
            ];
        }
        default : {return [];}
    }
}

const priority = [ 
    "shoulder","chest","sleeve","arm","T_length",
    "waist","crotch","hips","thigh","hem","calve","B_length",
    "length",
    "height","heel","S_width", "S_length"];

module.exports = {
    supportCate, ptype, sizeName, getSizeRate, getSizeRateName, getTypeName, priority
}