import { fetchAllJobs } from "../../actions/jobs"
import { fetchAllConsultants } from "../../actions/consultants"
import * as Whisper from "../../actions/whisper"
import { connect } from "react-redux"
import Startup from "./startup"

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
      await dispatch(Whisper.init())
    }, 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
