import * as R from "ramda"
import {
    SET_WHISPER_KEY_ID
} from "../actions/user"

const initialState = {
    whisperKeyId: ""
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WHISPER_KEY_ID:
      return R.merge(state, { whisperKeyId: action.keyId })
    default:
      return state
  }
}
