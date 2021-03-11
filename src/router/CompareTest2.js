import { useContext, useState } from "react";

import { ProductContext } from './Compare';

const Compare2 = ({history}) => {
    const [toggle, setToggle] = useState(false);

    const product = useContext(ProductContext);
    console.log("Context" , product);

    console.log("Compare2");
    
    return (
        <div>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
            <p>{toggle ? "참" : "거짓"}</p>
        </div>
    );
}
export default Compare2;