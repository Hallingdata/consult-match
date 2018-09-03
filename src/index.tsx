import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "typeface-roboto"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ConnectedRouter } from "connected-react-router"
import { applyMiddleware, compose, createStore } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { Provider } from "react-redux"

import { configureStore } from "./store"
import { createBrowserHistory } from "history"

import theme from "./theme"

const history = createBrowserHistory()
const store = configureStore(history)

console.log("history: " + history)
console.log("store: " + store)

/*
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.getAccounts().then(console.log);

      type: "ws",
      url: "ws://127.0.0.1:8545",
*/

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
)
registerServiceWorker()
