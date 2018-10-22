import RegisterConsultant from "./register"
import { registerConsultant } from "../../../state/actions/consultants"
import { connect } from "react-redux"
import * as R from "ramda"

const mapStateToProps = (state: any) => {
  return {
    waitingForRegistration: state.consultant.waitingForRegistration,
    walletIsUnlocked: state.web3.defaultEthAddress != null,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerConsultant: (consultant: Consultant) =>
      dispatch(registerConsultant(consultant)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterConsultant)
