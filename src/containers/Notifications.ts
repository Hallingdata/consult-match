import Notifications from "../components/Notifications"
import { connect } from "react-redux"
import { closeNotification } from "../actions/notifications";

const mapStateToProps = (state: any, { match }: any) => {
  return {
    message: state.notification.message,
    type: state.notification.type,
    open: state.notification.open,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    close: () => dispatch(closeNotification()) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)<any>(Notifications)
