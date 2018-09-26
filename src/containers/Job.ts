import Job from "../components/Job"
import { fetchAllJobs } from "../actions/jobs"
import { connect } from "react-redux"
import * as Whisper from "../integrations/whisper"

const mapStateToProps = (state: any, { match }: any) => {
  console.log("This jobs hash:  " + match.params.hash)
  return {
    job: state.job.jobs[match.params.hash],
    jobHash: match.params.jobHash,
  }
}

const mapDispatchToProps = (dispatch: any, { match }: any) => {
  return {
    subscribe: (keyId: string) => {
      Whisper.subscribe(
        keyId,
        Whisper.getWhisperTopicForJob(match.params.jobHash)
      )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job)
