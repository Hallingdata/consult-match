import { combineReducers } from "redux"
import { dataReducer } from "./data"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant";

const reducer = combineReducers({
  data: dataReducer,
  job: jobReducer,
  consultant: consultantReducer
})

export default reducer
