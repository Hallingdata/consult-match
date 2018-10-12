import JobView from "./view"
import { fetchAllJobs } from "../../../state/actions/jobs"
import { connect } from "react-redux"
import * as Whisper from "../../../integrations/whisper"
import { push } from "connected-react-router"
import { markJobComplete } from "src/state/actions/jobs"

const mapStateToProps = (state: any, { match }: any) => {
  console.log("This jobs hash:  " + match.params.hash)
  return {
    job: state.job.jobs[match.params.hash],
    jobHash: match.params.hash,
    myDefaultAddress: state.web3.defaultEthAddress,
  }
}

const mapDispatchToProps = (dispatch: any, { match }: any) => {
  return {
    markeJobComplete: (jobIndex: number) => dispatch(markJobComplete(jobIndex)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobView)
