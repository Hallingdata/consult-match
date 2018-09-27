import { fetchAllJobs } from "../actions/jobs"
import { fetchAllConsultants } from "../actions/consultants"
import { initWhisper } from "../actions/user"
import { connect } from "react-redux"
import Startup from "../components/Startup"

function mapStateToProps(state: any) {
  return {
    ready: state.job.initialLoaded && state.consultant.initialLoaded,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: async () => {
      await dispatch(fetchAllJobs()),
        await dispatch(fetchAllConsultants())
      await dispatch(initWhisper())
    }, 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
