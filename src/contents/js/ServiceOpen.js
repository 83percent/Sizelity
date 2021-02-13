const ServiceOpen = () => {
    let width = window.screen.availWidth;
    let height = Math.floor(window.screen.availHeight - 100);
    if(width > 1280) {
        console.log("Service open device : ", "Desktop");
        window.open('/view','Sizelity',`width=${Math.floor(width/2.5)}, height=${height}, menubar=no, location=no, status=no, toolbar=no`);
    } else {
        console.log("Service open device : ", "mobile");
        //window.open('/view','Sizelity');
        window.location.href="/view";
    }
    
}
export default ServiceOpen;