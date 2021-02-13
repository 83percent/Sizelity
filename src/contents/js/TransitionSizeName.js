class TransitionSizeName {
    constructor(lang = "KOR") {
        const langArr = ["KOR","JPN"];
        if(langArr.indexOf(lang) === -1) {
            return new Error(`${lang} is not valid language`);
        }
        this.sizeObj = {
            shoulder : {
                KOR : "어깨",
                JPN : "かた"
            },
            chest : {
                KOR : "가슴",
                JPN : "きょうい"
            },
            sleeve : {
                KOR : "팔길이",
                JPN : "スリーブ"
            },
            arm : {
                KOR : "팔통 (암홀)",
                JPN : "アームホール"
            },
            T_length : {
                KOR : "총 길이 (상의)",
                JPN : "そたけ"
            },
            waist : {
                KOR : "허리",
                JPN : "どうまわり"
            },
            crotch : {
                KOR : "밑위",
                JPN : "またのたかさ"
            },
            hips : {
                KOR : "엉덩이",
                JPN : "尻まわり"
            },
            thigh : {
                KOR : "허벅지",
                JPN : "太もも"
            },
            hem : {
                KOR : "밑단",
                JPN : "すそはば"
            },
            calve : {
                KOR : "종아리",
                JPN : "ふくらはぎ"
            },
            B_length : {
                KOR : "총 길이 (하의)",
                JPN : "そたけ"
            }

        }
        this.lang = lang; // KO
    }
    get(sizeName) {return this.sizeObj[sizeName][this.lang];}
    
}
export default TransitionSizeName;