import { fetchAllJobs } from "../../state/actions/jobs"
import { fetchAllConsultants } from "../../state/actions/consultants"
import * as Whisper from "../../state/actions/whisper"
import { connect } from "react-redux"
import Startup from "./startup"
import { fetchDefualtEthAddress, checkNetwork } from "../../state/actions/web3"

function mapStateToProps(state: any) {
  return {
    ready: state.job.initialLoaded && state.consultant.initialLoaded,
    correctNetwork: state.web3.correctNetwork,
    deployedNetworks: state.web3.deployedNetworks,
    currentNetwork: state.web3.currentNetwork,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkNetwork: () => dispatch(checkNetwork()),
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
