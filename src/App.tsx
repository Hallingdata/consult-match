import * as React from "react"
import { SFC } from "react"
import { Route, Switch } from "react-router"

import Layout from "./components/Layout"
import PostJobForm from "./containers/PostJobForm"
import JobList from "./containers/JobList"
import Home from "./components/Home"
import Job from "./containers/Job"
import Startup from "./containers/Startup"

const App: SFC = () => (
  <Layout>
    <Startup>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/nytt-oppdrag" component={PostJobForm} />
        <Route path="/oppdrag/:hash" component={Job} />
        <Route path="/oppdrag" component={JobList} />
      </Switch>
    </Startup>
  </Layout>
)

export default App
