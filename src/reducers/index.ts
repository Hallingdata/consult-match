import { combineReducers } from "redux"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant";
import { notificationReducer } from "./notifications";
import { whisperReducer } from "./whisper";

const reducer = combineReducers({
  job: jobReducer,
  consultant: consultantReducer,
  notification: notificationReducer,
  whisper: whisperReducer,
})

export default reducer
