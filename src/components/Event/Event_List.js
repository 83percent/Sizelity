import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Context
import { ServerContext } from "../../App";

const EventList = () => {
    // State
    const [_option, _setOption] = useState('all');
    const [_eventArrays, _setEventArrays] = useState([]);

    // Ref
    const optionFrameRef = useRef(null);

    // Context
    const server = useContext(ServerContext);

    // Field
    const eventCateArray = [
        ["free","무료배송"],
        ["discount","할인"],
        ["coupon", "쿠폰"],
        ["saving", "적립"]
    ];

    
    const event = {
        optionSelect : function(option, target) {
            if(_option === option) return;
            if(optionFrameRef.current !== null) {
                optionFrameRef.current.classList.remove("active");
            }
            target.classList.add("active");
            optionFrameRef.current = target;
            _setOption(option);
        }
    }
    

    
        
    return null;
}

export default EventList;