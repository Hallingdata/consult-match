import * as R from "ramda"
import {
  SET_CONSULTANTS_ARRAY,
  CONSULTANT_REGISTRATION_START,
  CONSULTANT_REGISTRATION_COMPLETE,
} from "../actions/consultants"

const initialState = {
  consultants: {},
  initialLoaded: false,
  waitingForRegistration: false,
}

export const consultantReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONSULTANTS_ARRAY:
      return Object.assign({}, state, {
        consultants: action.consultants,
        initialLoaded: true,
      })
    case CONSULTANT_REGISTRATION_START:
      return R.merge(state, { waitingForRegistration: true })
    case CONSULTANT_REGISTRATION_COMPLETE:
      return R.merge(state, { waitingForRegistration: false })
    default:
      return state
  }
}
