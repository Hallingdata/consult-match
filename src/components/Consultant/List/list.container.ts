import ConsultantList from "./list"
import { fetchAllConsultants } from "../../../state/actions/consultants"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { getLink } from "../../../integrations/ipfs"

const mapStateToProps = (state: any) => {
  return {
    myDefaultAddress: state.web3.defaultEthAddress,
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
    getImageLink: (imageHash: string | undefined) =>
      imageHash != null ? getLink(imageHash) : "",
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantList)
