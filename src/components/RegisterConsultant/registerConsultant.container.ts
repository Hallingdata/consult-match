import RegisterConsultant from "./registerConsultant";
import { registerConsultant  } from "../../actions/consultants";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    waitingForRegistration: state.consultant.waitingForRegistration
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
     registerConsultant: (consultant: Consultant) => dispatch(registerConsultant(consultant)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConsultant)
