import JobList from "./jobList"
import { fetchAllJobs } from "../../actions/jobs"
import { connect } from "react-redux"
import { push } from "connected-react-router"

const mapStateToProps = (state: any) => {
  return {
    jobs: state.job.jobs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: () => {
      dispatch(fetchAllJobs())
    },
    clickJob: (hash: string) => () => {
      dispatch(push(`/job/${hash}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobList)
