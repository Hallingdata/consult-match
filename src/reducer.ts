import { combineReducers } from "redux"
import { dataReducer } from "./reducers/data"
import { jobReducer } from "./reducers/job"

const reducer = combineReducers({
  data: dataReducer,
  job: jobReducer,
})

export default reducer
