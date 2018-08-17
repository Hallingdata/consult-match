import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { drizzleReducers } from "drizzle"
import { dataReducer } from "./reducers/data"
import { jobReducer } from "./reducers/job"

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  data: dataReducer,
  job: jobReducer,
})

export default reducer
