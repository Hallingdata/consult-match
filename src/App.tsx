import * as React from "react"
import { SFC } from "react"
import { Route, Switch } from "react-router"

import Layout from "./components/Layout"
import PostJobForm from "./containers/PostJobForm"
import JobList from "./containers/JobList"
import Home from "./components/Home"
import Job from "./containers/Job"
import Startup from "./containers/Startup"
import ConsultantList from "./containers/ConsultantList";
import ConsultantsProfile from "./containers/ConsultantsProfile";
import RegisterConsultant from "./containers/RegisterConsultant";
import Chat from "./containers/Chat";
import Notifications from "./containers/Notifications";

const App: SFC = () => (
  <Layout>
    <Startup>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/new-job" component={PostJobForm} />
        <Route path="/job/:hash" component={Job} />
        <Route path="/job" component={JobList} />
        <Route path="/consultant/:hash" component={ConsultantsProfile} />
        <Route path="/consultant" component={ConsultantList} />
        <Route path="/new-consultant" component={RegisterConsultant} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Startup>
    <Notifications/>
  </Layout>
)

export default App
