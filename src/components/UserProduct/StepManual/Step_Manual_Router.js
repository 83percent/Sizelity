import { useContext, useState } from "react";

// Step Component
import Step1Manual from "./Step1_Manual";
import Step2Manual from "./Step2_Manual";
import Step3Manual from "./Step3_Manual";
import Step4Manual from "./Step4_Manual";

// Context
import { ConfigContext } from "../../../App";

const Step_Manual_Router = ({step}) => {
    // Context
    const config = useContext(ConfigContext);
    const [manualOpen, setManualOpen] = useState(() => {
        try {
            if(config?.get()?.manual?.add) return true;
            else return false;
        } catch(error) {
            console.log(error)
            return false;
        }
    });

    const event = {
        close : function(never) {
            if(never) {
                config.setManualLevel("add",0);
            }
            setManualOpen(false);
        }
    }

    if(manualOpen) {
        switch(step) {
            case 1 : return <Step1Manual />
            case 2 : return <Step2Manual />
            case 3 : return <Step3Manual />
            case 4 : return <Step4Manual close={event.close}/>
            default : return null;
        }
    } else {
        return null;
    }
}

export default Step_Manual_Router;