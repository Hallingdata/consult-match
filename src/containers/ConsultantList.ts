import ConsultantList from "../components/ConsultantList"
import { fetchAllConsultants } from "../actions/consultants"
import { connect } from "react-redux"
import { push } from "connected-react-router"

const mapStateToProps = (state: any) => {
  return {
    consultants: state.consultant.consultants,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchConsultants: () => {
      dispatch(fetchAllConsultants())
    },
    clickConsultant: (hash: string) => () => {
      dispatch(push(`/consultant/${hash}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantList)
