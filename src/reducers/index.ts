import { combineReducers } from "redux"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant";
import { notificationReducer } from "./notifications";
import { userReducer } from "./user";

const reducer = combineReducers({
  job: jobReducer,
  consultant: consultantReducer,
  notification: notificationReducer,
  user: userReducer,
})

export default reducer
