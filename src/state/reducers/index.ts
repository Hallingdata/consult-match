import { combineReducers } from "redux"
import { jobReducer } from "./job"
import { consultantReducer } from "./consultant"
import { notificationReducer } from "./notifications"
import { whisperReducer } from "./whisper"
import { web3Reducer } from "./web3"

const reducer = combineReducers({
  job: jobReducer,
  consultant: consultantReducer,
  notification: notificationReducer,
  whisper: whisperReducer,
  web3: web3Reducer,
})

export default reducer
