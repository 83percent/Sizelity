import { Route, Switch } from "react-router";
import { useContext } from "react";

import ViewComponent from '../components/UserProduct/ViewProduct';
import AddComponent from '../components/UserProduct/AddProduct';

import { LoginContext } from '../App';


const UserProduct = ({history}) => {
    // Context
    const { userInfo } = useContext(LoginContext);

    // LoginCheck
    if(!userInfo || !userInfo._id || !userInfo.name) {
        history.replace("/notlogin");
    }
    return (
        <Switch>
            <Route exact path="/closet/add" component={AddComponent} />
            <Route path="/closet" component={ViewComponent} />
        </Switch>
    )
}
export default UserProduct;