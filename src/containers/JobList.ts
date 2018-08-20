import JobList from "../components/JobList"
import { fetchAllJobs } from "../actions/jobs"
import { drizzleConnect } from "drizzle-react"

const mapStateToProps = (state: any) => {
  return {
    jobs: state.job.jobs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchJobs: (web3: any, contract: any) =>
      dispatch(fetchAllJobs(web3, contract)),
  }
}

export default drizzleConnect(JobList, mapStateToProps, mapDispatchToProps)
