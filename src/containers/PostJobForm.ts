import PostJobForm from "../components/PostJobForm"
import { postJob } from "../actions/jobs"
import { drizzleConnect } from "drizzle-react"

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    postJob: (web3: any, contract: any) => (job: any) => dispatch(postJob(web3, contract, job)),
  }
}

export default drizzleConnect(PostJobForm, mapStateToProps, mapDispatchToProps)
