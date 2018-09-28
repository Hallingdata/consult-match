import Chat from "../components/Chat"
import { sendMessage } from "../actions/whisper"
import { connect } from "react-redux"
import * as Whisper from "../integrations/whisper"

type Props = {
  publicKey: string
  jobHash: string
  match?: any
}

const mapStateToProps = (state: any, { match }: Props) => {
  return {
    messages: state.whisper.messages,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: Props) => {
  return {
    sendMessage: (message: string) => {
      console.log("public key: " + ownProps.publicKey)
      dispatch(sendMessage(message, ownProps.publicKey, ownProps.jobHash))
    },
  }
}

export default connect<any, any, Props>(
  mapStateToProps,
  mapDispatchToProps
)<any>(Chat)
