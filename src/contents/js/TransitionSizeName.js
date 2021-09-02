class TransitionSizeName {
    constructor(lang = "KOR") {
        const langArr = ["KOR","JPN", "ENG"];
        if(langArr.indexOf(lang) === -1) {
            return new Error(`${lang} is not valid language`);
        }
        this.sizeObj = {
            shoulder : {
                KOR : "어깨",
                ENG : "Shoulder",
                JPN : "かた"
            },
            chest : {
                KOR : "가슴",
                ENG : "Chest",
                JPN : "きょうい"
            },
            sleeve : {
                KOR : "팔길이",
                ENG : "Sleeve",
                JPN : "スリーブ"
            },
            arm : {
                KOR : "팔통 (암홀)",
                ENG : "ARM",
                JPN : "アームホール"
            },
            T_length : {
                KOR : "총 길이 (상의)",
                ENG : "Length (TOP)",
                JPN : "そたけ"
            },
            waist : {
                KOR : "허리",
                ENG : "Waist",
                JPN : "どうまわり"
            },
            crotch : {
                KOR : "밑위",
                ENG : "Crotch",
                JPN : "またのたかさ"
            },
            hips : {
                KOR : "엉덩이",
                ENG : "Hips",
                JPN : "尻まわり"
            },
            thigh : {
                KOR : "허벅지",
                ENG : "Thigh",
                JPN : "太もも"
            },
            hem : {
                KOR : "밑단",
                ENG : "Hem",
                JPN : "すそはば"
            },
            calve : {
                KOR : "종아리",
                ENG : "Calve",
                JPN : "ふくらはぎ"
            },
            B_length : {
                KOR : "총 길이 (하의)",
                ENG : "Length (Bottom)",
                JPN : "そたけ"
            },
            length : {
                KOR : "총 길이",
                ENG : "Length",
                JPN : "そたけ"
            },
            height : {
                KOR : "높이",
                ENG : "Height",
                JPN : ""
            },
            heel : {
                KOR : "굽높이",
                ENG : "Heel",
                JPN : ""
            },
            width : {
                KOR : "발볼",
                ENG : "Width",
                JPN : ""
            },
            S_length : {
                KOR : "길이",
                ENG : "Length (Shose)",
                JPN : ""
            }
        }
        this.cateObj = {
            outer : {
                KOR : "아우터",
                ENG : "Outer",
                JPN : "",
            },
            top : {
                KOR : "상의",
                ENG : "Top",
                JPN : "",
            },
            bottom : {
                KOR : "하의",
                ENG : "Bottom",
                JPN : "",
            },
            suit : {
                KOR : "한벌 옷",
                ENG : "Suit"
            },
            set : {
                KOR : "세트",
                ENG : "Set",
                JPN : "",
            },
            shoes : {
                KOR : "신발",
                ENG : "Shoes",
                JPN : "",
            },
            onepiece : {
                KOR : "원피스",
                ENG : "One Piece",
                JPN : "",
            },
            skirt : {
                KOR : "치마",
                ENG : "SKirt",
                JPN : "",
            }
        }
        this.lang = lang; // KO
    }
    get(sizeName) {return this.sizeObj[sizeName][this.lang];}
    getCate(cateName) {return this.cateObj[cateName][this.lang];}
}
export default TransitionSizeName;