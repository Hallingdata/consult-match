import * as Swarm from "../integrations/swarm"
import * as R from "ramda"
import * as JobsContract from "../contracts/Jobs"

export const SET_JOBS_ARRAY = "SET_JOBS_ARRAY"

export const setJobs = (jobs: any) => ({
  type: SET_JOBS_ARRAY,
  jobs,
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

export const postJob = (job: Job) => async (
  dispatch: any
) => {
  const hash = await Swarm.publish(job)
  await JobsContract.postJob(hash)
  dispatch(fetchAllJobs())
}
