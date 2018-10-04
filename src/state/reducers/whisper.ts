import * as R from "ramda"
import { SET_MY_WHISPER_KEY_ID, ADD_NEW_MESSAGE } from "../actions/whisper"

type State = {
  myWhisperKeyId: ""
  messages: {
    jobs: { [jobHash: string]: { [contact: string]: ChatMessage[] } }
  }
}

const initialState: State = {
  myWhisperKeyId: "",
  messages: {
    jobs: {},
  },
}

export const whisperReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MY_WHISPER_KEY_ID:
      return R.merge(state, { myWhisperKeyId: action.keyId })
    case ADD_NEW_MESSAGE:
      const { sender, content, jobHash }: ChatMessage = action.message
      return {
        ...state,
        messages: {
          ...state.messages,
          jobs: {
            ...state.messages.jobs,
            [jobHash]: {
              ...R.pathOr({}, ["messages", "jobs", jobHash], state),
              [sender]: R.append(action.message, R.pathOr(
                [],
                ["messages", "jobs", jobHash, sender],
                state
              ) as ChatMessage[]),
            },
          },
        },
      }
    default:
      return state
  }
}
