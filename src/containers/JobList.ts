import JobList from "../components/JobList"
import { fetchAllJobs } from "../actions/jobs"
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    jobs: state.job.jobs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: () => {
      dispatch(fetchAllJobs())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList)