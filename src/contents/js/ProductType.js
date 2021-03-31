const ptype = [
    {value : "set", name : "세트"},
    {value : "outer", name : "아우터"},
    {value : "top", name : "상의"},
    {value : "onepiece", name : "원피스"},
    {value : "bottom", name : "하의"},
    {value : "skirt", name : "치마"},
    {value : "shoes", name : "신발"}
];

const sizeName = ['XS','S','M','L','XL','직접입력'];


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
                [ "B_width", "폭"],
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
        case 'onepiece' : {
            return [
                [ "shoulder","어깨"],
                [ "chest","가슴"],
                [ "sleeve","소매(팔길이, 팔)"],
                [ "arm","암홀(팔통)"],
                [ "waist", "허리"],
                [ "B_width", "폭"],
                [ "T_length","총길이"]
            ];
        }
        case 'bottom' :
        case 'skirt' : {
            return [
                [ "waist", "허리"],
                [ "crotch", "밑위"],
                [ "hips", "엉덩이"],
                [ "thigh", "허벅지"],
                [ "B_length","총길이"],
                [ "hem", "밑단"],
                [ "B_width", "폭"],
                [ "calve", "종아리"]
            ];
        }
        case 'shoes' : {
            return [
                [ "height", "높이"],
                [ "heel", "굽높이"],
                [ "width", "발볼"],
                [ "S_length", "길이"]
            ];
        }
        default : {return [];}
    }
}
/* const subtype = (type) => {
    switch(type) {
        case "set" : {
            return _set;
        }
        case "outer" : {
            return _outer;
        }
        case "top" : {
            return _top;
        }
        case "onepiece" : {
            return _onepiece;
        }
        case "bottom" : {
            return _bottom;
        }
        case "skirt" : {
            return _skirt;
        }
        case "shoes" : {
            return _shoes;
        }
        default : {
            return null;
        }
    }
} */
module.exports = {
    ptype, sizeName, getSizeRate
    /* subtype : subtype */
}