import * as React from "react"
import { SFC } from "react"
import { Route, Switch } from "react-router"

import Layout from "./components/Layout"
import PostJobForm from "./containers/PostJobForm"
import JobList from "./containers/JobList"

const App: SFC = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={JobList} />
      <Route path="/new-job" component={PostJobForm} />
    </Switch>
  </Layout>
)

export default App
