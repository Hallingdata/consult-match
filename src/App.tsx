import * as React from "react"
import { SFC } from "react"
import { Route, Switch } from "react-router"

import Layout from "./components/Layout"
import PostJobForm from "./components/PostJobForm/postJobForm"
import JobList from "./components/JobList/jobList"
import Home from "./components/Home"
import Job from "./components/Job/job"
import Startup from "./components/Startup"
import ConsultantList from "./components/ConsultantList/consultantList"
import ConsultantsProfile from "./components/ConsultantProfile/consultantsProfile.container"
import RegisterConsultant from "./components/RegisterConsultant/registerConsultant"
import Chat from "./components/Chat/chat"
import Notifications from "./components/Notifications"

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
    <Notifications />
  </Layout>
)

export default App
