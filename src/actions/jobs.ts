import { publish, getContent } from "../integrations/swarm"

export const ADD_JOB_HASH_TO_MY_JOBS = "ADD_JOB_HASH_TO_MY_JOBS"
export const SET_SELECTED_JOB = "SET_SELECTED_JOB"

export const addHashToMyJobs = (hash: string) => ({
  type: ADD_JOB_HASH_TO_MY_JOBS,
  hash,
})

export const setSelectedJob = (hash: string, content: any) => ({
  type: SET_SELECTED_JOB,
  content,
  hash,
})

export const postJob = (web3: any, contract: any, jobData: any) => async (
  dispatch: any
) => {
  const hash = await publish(jobData)
  console.log("cont2: " + JSON.stringify(contract.methods))
  const responds = await contract.methods.addJob(web3.utils.fromAscii(hash)).send({gas: 99999999})
  console.log("res: " + responds)
  dispatch(addHashToMyJobs(hash))
}

export const openJob = (hash: string) => async (dispatch: any) => {
  const jobContent = await getContent(hash)
  dispatch(setSelectedJob(hash, jobContent))
}
