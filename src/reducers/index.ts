import { combineReducers } from "redux"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant";

const reducer = combineReducers({
  job: jobReducer,
  consultant: consultantReducer
})

export default reducer
