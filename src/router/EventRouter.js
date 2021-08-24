import { Route, Switch } from 'react-router';

// Component
import EventMain from '../components/Event/Event_Main';

const Event = () => {
    return (
        <Switch>
            <Route exact path="/event" component={EventMain} />
            
        </Switch>
    )
}

export default Event;