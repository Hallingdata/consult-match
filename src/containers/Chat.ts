import Chat from "../components/Chat"
import { connect } from "react-redux"
import * as Whisper from "../integrations/whisper";

const mapStateToProps = (state: any, { match }: any) => {
  return {
    messages: [],
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (message: string) => Whisper.sendMessage(message)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)<any>(Chat)
