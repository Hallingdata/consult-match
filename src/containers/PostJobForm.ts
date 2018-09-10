import PostJobForm from "../components/PostJobForm"
import { postJob } from "../actions/jobs"
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
     postJob: (job: Job) => dispatch(postJob(job)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobForm)
