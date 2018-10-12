import JobForm from "./form"
import { postJob } from "../../../state/actions/jobs"
import { connect } from "react-redux"

const mapStateToProps = (state: any) => {
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
)(JobForm)
