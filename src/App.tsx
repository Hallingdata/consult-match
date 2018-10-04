import * as React from "react"
import { SFC } from "react"
import { Route, Switch } from "react-router"

import Layout from "./components/Layout"
import JobForm from "./components/Job/Form"
import JobList from "./components/Job/List"
import Home from "./components/Home"
import JobView from "./components/Job/View"
import Startup from "./components/Startup"
import ConsultantList from "./components/Consultant/List"
import ConsultantsProfile from "./components/Consultant/Profile"
import ConsultantRegister from "./components/Consultant/Register"
import ChatView from "./components/Chat/View"
import Notifications from "./components/Notifications"

const App: SFC = () => (
  <Layout>
    <Startup>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/new-job" component={JobForm} />
        <Route path="/job/:hash" component={JobView} />
        <Route path="/job" component={JobList} />
        <Route path="/consultant/:hash" component={ConsultantsProfile} />
        <Route path="/consultant" component={ConsultantList} />
        <Route path="/new-consultant" component={ConsultantRegister} />
        <Route path="/chat/:jobHash/:senderPublicKey" component={ChatView} />
        <Route path="/chat" component={ChatView} />
      </Switch>
    </Startup>
    <Notifications />
  </Layout>
)

export default App
