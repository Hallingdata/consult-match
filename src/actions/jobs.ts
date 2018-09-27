import {Action, ActionCreator, Dispatch} from 'redux';


import * as Swarm from "../integrations/swarm"
import * as Whisper from "../integrations/whisper"
import * as R from "ramda"
import * as JobsContract from "../contracts/Jobs"
import { setWhisperKeyId } from "./user";

export const SET_JOBS_ARRAY = "SET_JOBS_ARRAY"
export const JOB_POSTING_STARTED = "JOB_POSTING_STARTED"
export const JOB_POSTING_COMPLETE = "JOB_POSTING_COMPLETE"

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

export const postJob = (job: Job) => async (dispatch: any, getState: any) => {
  dispatch({ type: JOB_POSTING_STARTED })
  const whisperKeyId = await Whisper.generateKeyParFromEthAccountSignature()
  dispatch(setWhisperKeyId(whisperKeyId))
  console.log("KeyId: " + whisperKeyId)
  const whisperEmployerPublicKey = await Whisper.getPublicKey(whisperKeyId)
  console.log("whisperEmployerPublicKey: " + whisperEmployerPublicKey)
  const hash = await Swarm.publish(
    R.assoc("whisperEmployerPublicKey", whisperEmployerPublicKey, job)
  )
  await JobsContract.postJob(hash)
  dispatch(fetchAllJobs())
  dispatch({ type: JOB_POSTING_COMPLETE })
}
