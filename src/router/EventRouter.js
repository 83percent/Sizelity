import { Route, Switch } from 'react-router';

// Component
import EventMain from '../components/Event/EventMain';

const Event = () => {
    return (
        <Switch>
            <Route exact path="/event" component={EventMain} />
        </Switch>
    )
}

export default Event;