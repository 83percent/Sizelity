import { Route, Switch } from 'react-router';

// Component
import EventList from '../components/Event/Event_List';

const Event = () => {
    return (
        <Switch>
            <Route exact path="/event" component={EventList} />
        </Switch>
    )
}

export default Event;