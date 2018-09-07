import Job from "../components/Job"
import { fetchAllJobs } from "../actions/jobs"
import { connect } from "react-redux"

const mapStateToProps = (state: any, { match }: any) => {
  console.log("This jobs hash:  " + match.params.hash)
  return {
    job: state.job.jobs[match.params.hash],
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job)
