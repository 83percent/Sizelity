class Cookie {
    constructor() {}
    get(cname) {
        try {
            const name = cname + "=";
            const decodedCookie = document.cookie;
            const ca = decodedCookie.split(';');
            for(let c of ca) {
                while (c.charAt(0) === ' ') { c = c.substring(1); }
                if (c.indexOf(name) === 0) {
                    const cookie = c.substring(name.length, c.length);
                    return JSON.parse(cookie);
                }
            }
        } catch(error) {
            console.log(error);
            return null;
        }
    }
    set(cname, data, _expires) {
        const d = new Date();
        if(_expires === undefined) d.setTime(d.getTime() + (500 * 24 * 60 * 60 * 1000)); 
        else d.setTime(d.getTime() + (_expires * 24 * 60 * 60 * 1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + JSON.stringify(data) + ";" + expires + ";path=/";
        return true;
    }
}

export default Cookie;