import Job from "./view"
import { fetchAllJobs } from "../../../state/actions/jobs"
import { connect } from "react-redux"
import * as Whisper from "../../../integrations/whisper"
import { push } from "connected-react-router"

const mapStateToProps = (state: any, { match }: any) => {
  console.log("This jobs hash:  " + match.params.hash)
  return {
    job: state.job.jobs[match.params.hash],
    jobHash: match.params.hash,
  }
}

const mapDispatchToProps = (dispatch: any, { match }: any) => {
  return {
    openChat: (jobHash: string, whisperEmployerPublicKey: string) =>
      dispatch(push(`/chat/${jobHash}/${whisperEmployerPublicKey}`)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job)
