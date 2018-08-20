import * as React from "react"
import { SFC } from "react"

import { DrizzleProvider } from "drizzle-react"
import { LoadingContainer } from "drizzle-react-components"
import store from "./store"
import Layout from "./components/Layout"
import drizzleOptions from "./drizzleOptions"
import PostJobForm from "./containers/PostJobForm"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import CssBaseline from "@material-ui/core/CssBaseline"
import JobList from "./containers/JobList"

const theme = createMuiTheme({
  spacing: {
    unit: 20,
  },
  palette: {
    primary: purple,
    secondary: green,
  },
})

const App: SFC = () => (
  <DrizzleProvider options={drizzleOptions} store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingContainer>
        <Layout>
          <JobList />
          <PostJobForm />
        </Layout>
      </LoadingContainer>
    </MuiThemeProvider>
  </DrizzleProvider>
)

export default App
