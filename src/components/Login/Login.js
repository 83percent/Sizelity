import { Link } from 'react-router-dom';
import { useContext } from 'react';


// CSS
import '../../contents/css/Login/Login.css';

// Context
import {ServerContext} from '../../App';


const ViewLogin = () => {
    const server = useContext(ServerContext);    
    return (
        <section id="View-login">
            
        </section>
    )
}
export default ViewLogin;