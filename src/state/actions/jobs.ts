import { Action, ActionCreator, Dispatch } from "redux"

import * as Swarm from "../../integrations/swarm"
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
  const jobHashes = await JobsContract.getHashesForAllJobs()

  const jobContent = await Promise.all(
    R.map(({ hash }) => Swarm.getContent(hash), jobHashes)
  )

  const jobsMap = R.reduce(
    (acc, index: number) =>
      R.merge(acc, {
        [jobHashes[index].hash]: {
          ...jobContent[index],
          done: jobHashes[index].done,
          owner: jobHashes[index].owner,
          jobIndex: jobHashes[index].jobIndex,
        },
      }),
    {},
    R.range(0, jobContent.length)
  )

  dispatch(setJobs(jobsMap))
}

export const postJob = (job: Job) => async (dispatch: any, getState: any) => {
  dispatch({ type: JOB_POSTING_STARTED })
  // const whisperKeyId = await Whisper.generateKeyParFromEthAccountSignature()
  // dispatch(setWhisperKeyId(whisperKeyId))
  // console.log("KeyId: " + whisperKeyId)
  // const whisperEmployerPublicKey = await Whisper.getPublicKey(whisperKeyId)
  // console.log("whisperEmployerPublicKey: " + whisperEmployerPublicKey)
  const hash = await Swarm.publish(
    job
    // R.assoc("whisperEmployerPublicKey", whisperEmployerPublicKey, job)
  )
  await JobsContract.postJob(hash)
  dispatch(fetchAllJobs())
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
