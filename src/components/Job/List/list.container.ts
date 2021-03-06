import JobList from "./list"
import { fetchAllJobs } from "../../../state/actions/jobs"
import { connect } from "react-redux"
import { push } from "connected-react-router"

const mapStateToProps = (state: any) => {
  return {
    myDefaultAddress: state.web3.defaultEthAddress,
    jobs: state.job.jobs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: () => {
      dispatch(fetchAllJobs())
    },
    clickJob: (hash: string) => () => {
      dispatch(push(`/job/${hash}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobList)
