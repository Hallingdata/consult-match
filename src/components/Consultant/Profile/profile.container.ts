import ConsultantProfile from "./profile"
import { fetchAllConsultants } from "../../../state/actions/consultants"
import { connect } from "react-redux"
import { getLink } from "../../../integrations/ipfs"
import { removeConsultant } from "../../../state/actions/consultants"

const mapStateToProps = (state: any, { match }: any) => {
  return {
    consultant: state.consultant.consultants[match.params.hash],
    myDefaultAddress: state.web3.defaultEthAddress,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getImageLink: (imageHash: string | undefined) =>
      imageHash != null ? getLink(imageHash) : "",
    removeConsultantProfile: (consultantIndex: number) =>
      dispatch(removeConsultant(consultantIndex)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantProfile)
