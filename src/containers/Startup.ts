import { fetchAllJobs } from "../actions/jobs"
import { fetchAllConsultants } from "../actions/consultants"
import { connect } from "react-redux"
import Startup from "../components/Startup"

function mapStateToProps(state: any) {
  return {
    ready: state.job.initialLoaded && state.consultant.initialLoaded,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: () => {
      dispatch(fetchAllJobs()),
      dispatch(fetchAllConsultants())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
