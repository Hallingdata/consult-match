import * as Swarm from "../integrations/swarm"
import * as R from "ramda"
import * as ConsultantsContract from "../contracts/Consultants"
import { newNotificationError } from "./notifications"

export const SET_CONSULTANTS_ARRAY = "SET_CONSULTANTS_ARRAY"
export const CONSULTANT_REGISTRATION_START = "CONSULTANT_REGISTRATION_START"
export const CONSULTANT_REGISTRATION_COMPLETE =
  "CONSULTANT_REGISTRATION_COMPLETE"

export const setConsultants = (consultants: any) => ({
  type: SET_CONSULTANTS_ARRAY,
  consultants,
})

export const fetchAllConsultants = () => async (dispatch: any) => {
  const consultantsHashes = await ConsultantsContract.getHashesForAllConsultants()

  const consultantContent = await Promise.all(
    R.map(hash => Swarm.getContent(hash), consultantsHashes)
  )

  const consultantMap = R.reduce(
    (acc, index: number) =>
      R.merge(acc, { [consultantsHashes[index]]: consultantContent[index] }),
    {},
    R.range(0, consultantContent.length)
  )

  dispatch(setConsultants(consultantMap))
}

export const registerConsultant = (consultant: Consultant) => async (
  dispatch: any
) => {
  dispatch({ type: CONSULTANT_REGISTRATION_START })
  try {
    const hash = await Swarm.publish(consultant)
    await ConsultantsContract.addConsultant(hash)
    dispatch({ type: CONSULTANT_REGISTRATION_COMPLETE })
  } catch (error) {
    console.log(`Error: ${error}`)
    dispatch(newNotificationError(error))
  }
}
