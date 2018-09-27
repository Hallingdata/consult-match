import { createStore, applyMiddleware, compose, Store } from "redux"
import thunkMiddleware from "redux-thunk"
import reducer from "./reducers"
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from "history"
import * as Whisper from "./integrations/whisper"

export function configureStore(history: History, initialState?: any): Store<any> {
  // Redux DevTools
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
          thunkMiddleware.withExtraArgument(Whisper.subscribe),
      )
    )
  )
  return store
}
