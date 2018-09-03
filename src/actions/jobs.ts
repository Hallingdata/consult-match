import * as Swarm from "../integrations/swarm"
import * as R from "ramda"
import * as JobsContract from "../contracts/Jobs"

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

export const fetchAllJobs = () => async (dispatch: any) => {
  const jobHashes = await JobsContract.getHashesForAllJobs()

  const jobContent = await Promise.all(
    R.map(hash => Swarm.getContent(hash), jobHashes)
  )

  const jobsMap = R.reduce(
    (acc, index: number) =>
      R.merge(acc, { [jobHashes[index]]: jobContent[index] }),
    {},
    R.range(0, jobContent.length)
  )

  dispatch(setJobs(jobsMap))
}

export const postJob = (jobData: any) => async (
  dispatch: any
) => {
  const hash = await Swarm.publish(jobData)
  await JobsContract.postJob(hash)
  dispatch(fetchAllJobs())
}
