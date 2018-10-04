import * as R from "ramda"
import {
  SET_JOBS_ARRAY,
  JOB_POSTING_STARTED,
  JOB_POSTING_COMPLETE,
} from "../../state/actions/jobs"

const initialState = {
  jobs: {},
  initialLoaded: false,
  waitingForJobPosting: false,
}

export const jobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_JOBS_ARRAY:
      return Object.assign({}, state, {
        jobs: action.jobs,
        initialLoaded: true
      })
    case JOB_POSTING_STARTED:
      return R.merge(state, { waitingForJobPosting: true })
    case JOB_POSTING_COMPLETE:
      return R.merge(state, { waitingForJobPosting: false })
    default:
      return state
  }
}
