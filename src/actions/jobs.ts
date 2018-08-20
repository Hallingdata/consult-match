import { publish, getContent } from "../integrations/swarm"
import * as R from "ramda"

export const ADD_JOB_HASH_TO_MY_JOBS = "ADD_JOB_HASH_TO_MY_JOBS"
export const SET_SELECTED_JOB = "SET_SELECTED_JOB"
export const SET_JOBS = "SET_JOBS"

export const setJobs = (jobs: any) => ({
  type: SET_JOBS,
  jobs,
})

export const addHashToMyJobs = (hash: string) => ({
  type: ADD_JOB_HASH_TO_MY_JOBS,
  hash,
})

export const setSelectedJob = (hash: string, content: any) => ({
  type: SET_SELECTED_JOB,
  content,
  hash,
})

export const fetchAllJobs = (web3: any, contract: any) => async (
  dispatch: any
) => {
  const numberOfJobs = parseInt(await contract.methods.numberOfJobs().call())

  const jobHashes = await Promise.all(
    R.map(
      index =>
        contract.methods
          .getJob(index)
          .call()
          .then((_: any) => web3.utils.toAscii(_)),
      R.range(0, numberOfJobs)
    )
  )

  const jobContent = await Promise.all(
    R.map(hash => getContent(hash), jobHashes)
  )

  const jobsMap = R.reduce(
    (acc, index: number) =>
      R.merge(acc, { [jobHashes[index]]: jobContent[index] }),
    {},
    R.range(0, numberOfJobs)
  )

  dispatch(setJobs(jobsMap))
}

export const postJob = (web3: any, contract: any, jobData: any) => async (
  dispatch: any
) => {
  const hash = await publish(jobData)
  const responds = await contract.methods
    .addJob(web3.utils.fromAscii(hash))
    .send({ gas: 99999999 })
  dispatch(addHashToMyJobs(hash))
  dispatch(fetchAllJobs(web3, contract))
}
