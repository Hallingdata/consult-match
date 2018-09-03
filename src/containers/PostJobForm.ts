import PostJobForm from "../components/PostJobForm"
import { postJob } from "../actions/jobs"
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // postJob: (web3: any, contract: any) => (job: any) => dispatch(postJob(web3, contract, job)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobForm)
