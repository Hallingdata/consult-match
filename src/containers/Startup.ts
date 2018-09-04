import { fetchAllJobs } from "../actions/jobs"
import { connect } from "react-redux"
import Startup from "../components/Startup"

function mapStateToProps(state: any) {
  return {
    ready: state.job.initialLoaded,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: () => {
      dispatch(fetchAllJobs())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
