import { fetchAllJobs } from "../../state/actions/jobs"
import { fetchAllConsultants } from "../../state/actions/consultants"
import * as Whisper from "../../state/actions/whisper"
import { connect } from "react-redux"
import Startup from "./startup"
import { fetchDefualtEthAddress } from "../../state/actions/web3"

function mapStateToProps(state: any) {
  return {
    ready: state.job.initialLoaded && state.consultant.initialLoaded,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: async () => {
      await dispatch(fetchAllJobs()),
        await dispatch(fetchAllConsultants()),
        await dispatch(fetchDefualtEthAddress())
      // await dispatch(Whisper.init())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup)
