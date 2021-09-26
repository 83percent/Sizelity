import { Route, Switch } from "react-router";

import ViewComponent from '../components/UserProduct/ViewProduct';
import AddComponent from '../components/UserProduct/AddProduct';



const UserProduct = () => {
    return (
        <Switch>
            <Route exact path="/closet/create" component={AddComponent} />
            <Route path="/closet" component={ViewComponent} />
        </Switch>
    )
}
export default UserProduct;