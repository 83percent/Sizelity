const ptype = [
    {value : "set", name : "세트"},
    {value : "outer", name : "아우터"},
    {value : "top", name : "상의"},
    {value : "onepiece", name : "원피스"},
    {value : "bottom", name : "하의"},
    {value : "skirt", name : "치마"},
    {value : "shoes", name : "신발"}
]

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
    ptype : ptype
    /* subtype : subtype */
}