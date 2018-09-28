import * as R from "ramda"
import { SET_WHISPER_KEY_ID, ADD_NEW_MESSAGE } from "../actions/whisper"

const initialState = {
  whisperKeyId: "",
  messages: [],
}

export const whisperReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WHISPER_KEY_ID:
      return R.merge(state, { whisperKeyId: action.keyId })
    case ADD_NEW_MESSAGE:
      return R.merge(state, {
        messages: R.append(action.message, state.messages),
      })
    default:
      return state
  }
}
