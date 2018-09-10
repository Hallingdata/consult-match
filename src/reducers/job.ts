import {
  SET_JOBS_ARRAY,
} from "../actions/jobs"

const initialState = {
  jobs: {},
  initialLoaded: false
}

export const jobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_JOBS_ARRAY:
      return Object.assign({}, state, {
        jobs: action.jobs,
        initialLoaded: true
      })
    default:
      return state
  }
}
