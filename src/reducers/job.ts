import {
  ADD_JOB_HASH_TO_MY_JOBS,
  SET_JOBS,
} from "../actions/jobs"

const initialState = {
  myJobHashes: [],
  jobs: {},
  initialLoaded: false
}

export const jobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_JOB_HASH_TO_MY_JOBS:
      return Object.assign({}, state, {
        myJobHashes: state.myJobHashes.concat(action.hash),
      })
    case SET_JOBS:
      return Object.assign({}, state, {
        jobs: action.jobs,
        initialLoaded: true
      })
    default:
      return state
  }
}
