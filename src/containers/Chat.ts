import Chat from "../components/Chat"
import { connect } from "react-redux"
import * as Whisper from "../integrations/whisper"

type Props = {
  publicKey: string
  jobHash: string
  match?: any
}

const mapStateToProps = (state: any, { match }: Props) => {
  return {
    messages: [],
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: Props) => {
  return {
    sendMessage: (message: string) =>
      Whisper.sendMessage(ownProps.publicKey, ownProps.jobHash, message),
  }
}

export default connect<any, any, Props>(
  mapStateToProps,
  mapDispatchToProps
)<any>(Chat)
