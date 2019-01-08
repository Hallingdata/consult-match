import { Action, ActionCreator, Dispatch } from "redux"

import { newNotificationError } from "./notifications"
import * as IPFS from "../../integrations/ipfs"
import * as Whisper from "../../integrations/whisper"
import * as R from "ramda"
import * as JobsContract from "../../contracts/Jobs"
import { setWhisperKeyId } from "./whisper"

export const SET_JOBS_ARRAY = "SET_JOBS_ARRAY"
export const JOB_POSTING_STARTED = "JOB_POSTING_STARTED"
export const JOB_POSTING_COMPLETE = "JOB_POSTING_COMPLETE"
export const JOB_MARK_COMPLETE_STARTED = "JOB_MARK_COMPLETE_STARTED"
export const JOB_MARK_COMPLETE_COMPLETE = "JOB_MARK_COMPLETE_COMPLETE"
export const setJobs = (jobs: any) => ({
  type: SET_JOBS_ARRAY,
  jobs,
})

export const fetchAllJobs = () => async (dispatch: any) => {
  const jobBlockchainData = await JobsContract.getBlockchainDataForAllJobs()
  const jobIpfsContent = await Promise.all(
    R.map(({ hash }) => IPFS.getContent(hash), jobBlockchainData)
  )

  const jobs: any = R.zipWith(R.merge, jobBlockchainData, jobIpfsContent)

  const jobsMap = R.reduce(
    (acc, index: number) =>
      R.merge(acc, {
        [jobs[index].hash]: jobs[index],
      }),
    {},
    R.range(0, jobs.length)
  )

  dispatch(setJobs(jobsMap))
}

export const postJob = (job: Job) => async (dispatch: any, getState: any) => {
  dispatch({ type: JOB_POSTING_STARTED })
  try {
    const hash = await IPFS.publish(job)
    console.log("hash: " + hash)
    await JobsContract.addJob(hash)
    dispatch(fetchAllJobs())
  } catch (error) {
    console.log(`Error: ${error}`)
    dispatch(newNotificationError(error.toString()))
  }
  dispatch({ type: JOB_POSTING_COMPLETE })
}

export const markJobComplete = (jobIndex: number) => async (
  dispatch: any,
  getStats: any
) => {
  console.log("jobIndex: " + jobIndex)
  dispatch({ type: JOB_MARK_COMPLETE_STARTED })
  await JobsContract.markJobComplete(jobIndex)
  await dispatch(fetchAllJobs())
  dispatch({ type: JOB_MARK_COMPLETE_COMPLETE })
}
