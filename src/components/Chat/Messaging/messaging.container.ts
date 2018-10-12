import * as R from "ramda"
import Messaging from "./messaging"
import { sendMessage } from "../../../state/actions/whisper"
import { connect } from "react-redux"
import * as Whisper from "../../../integrations/whisper"

type Props = {
  jobHash: string
  employerWhisperPublicKey: string
}

const mapStateToProps = (
  state: any,
  { jobHash, employerWhisperPublicKey }: Props
) => {
  return {
    messages: R.pathOr(
      [],
      [jobHash, employerWhisperPublicKey],
      state.whisper.messages.jobs
    ),
  }
}

const mapDispatchToProps = (
  dispatch: any,
  { jobHash, employerWhisperPublicKey }: Props
) => {
  return {
    sendMessage: (message: string) => {
      dispatch(sendMessage(message, employerWhisperPublicKey, jobHash))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messaging)
