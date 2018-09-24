import { combineReducers } from "redux"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant";
import { notificationReducer } from "./notifications";

const reducer = combineReducers({
  job: jobReducer,
  consultant: consultantReducer,
  notification: notificationReducer
})

export default reducer
