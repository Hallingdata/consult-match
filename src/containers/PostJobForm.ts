import PostJobForm from "../components/PostJobForm"
import { postJob } from "../actions/jobs"
import { connect } from "react-redux"
import { consultantReducer } from "../reducers/consultant"

const mapStateToProps = (state: any) => {
  console.log("waiting: " + state.job.waitingForJobPosting)
  
  return {
    waitingForJobPosting: state.job.waitingForJobPosting,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    postJob: (job: Job) => dispatch(postJob(job)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostJobForm)
