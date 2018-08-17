import { ADD_JOB_HASH_TO_MY_JOBS, SET_SELECTED_JOB } from "../actions/jobs"

const initialState = {
  myJobHashes: [],
  selectedJobHash: "",
  selectedJobContent: {},
}

export const jobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_JOB_HASH_TO_MY_JOBS:
      return Object.assign({}, state, {
        myJobHashes: state.myJobHashes.concat(action.hash),
      })
    case SET_SELECTED_JOB:
      return Object.assign({}, state, {
        selectedJobHash: action.hash,
        selectedJobContent: action.content,
      })
    default:
      return state
  }
}
