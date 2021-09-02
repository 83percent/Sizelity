// Module
import { Route, Switch } from "react-router";

// Component
import SettingList from '../components/Setting/SettingList';

import NoticeList from "../components/Setting/Notice/NoticeList";

import PersonalList from "../components/Setting/Personal/PersonalList";
import ChangeGender from "../components/Setting/Personal/ChangeGender";
import ChangeName from "../components/Setting/Personal/ChangeName";
import AccountOut from "../components/Setting/Personal/AccountOut";

import Write from "../components/Setting/Improvement/Write";
import ServiceList from "../components/Setting/Service/ServiceList";

const SettingRouter = () => {
    console.log();
    return (
        <>
            <Switch>
                <Route exact path="/setting/" component={SettingList} />

                <Route exact path="/setting/notice" component={NoticeList} />

                <Route exact path="/setting/user" component={PersonalList} />
                <Route exact path="/setting/user/gender" component={ChangeGender} />
                <Route exact path="/setting/user/name" component={ChangeName} />
                <Route exact path="/setting/user/out" component={AccountOut} />
        
                <Route path="/setting/improvement" component={Write} />
                <Route path="/setting/service" component={ServiceList} />
                
            </Switch>
        </>
    )
}
export default SettingRouter;