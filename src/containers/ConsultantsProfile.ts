import ConsultantProfile from "../components/ConsultantProfile"
import { fetchAllConsultants } from "../actions/consultants"
import { connect } from "react-redux"
import {getLink} from "../integrations/swarm"

const mapStateToProps = (state: any, { match }: any) => {
  console.log("This consultants hash:  " + match.params.hash)
  return {
    consultant: state.consultant.consultants[match.params.hash],
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getImageLink: (imageHash: string | undefined) => imageHash != null ? getLink(imageHash): ""
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantProfile)
