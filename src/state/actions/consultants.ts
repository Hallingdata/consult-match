import * as IPFS from "../../integrations/ipfs"
import * as R from "ramda"
import * as ConsultantsContract from "../../contracts/Consultants"
import { newNotificationError } from "./notifications"

export const SET_CONSULTANTS_ARRAY = "SET_CONSULTANTS_ARRAY"
export const CONSULTANT_REGISTRATION_START = "CONSULTANT_REGISTRATION_START"
export const CONSULTANT_REGISTRATION_COMPLETE =
  "CONSULTANT_REGISTRATION_COMPLETE"
export const CONSULTANT_REMOVE_START = "CONSULTANT_REMOVE_START"
export const CONSULTANT_REMOVE_COMPLETE = "CONSULTANT_REMOVE_COMPLETE"

export const setConsultants = (consultants: any) => ({
  type: SET_CONSULTANTS_ARRAY,
  consultants,
})

export const fetchAllConsultants = () => async (dispatch: any) => {
  const consultantsBlockchainData = await ConsultantsContract.getBlockchainDataForAllConsultants()
  const consultantsIpfsContent: any = await Promise.all(
    R.map(
      ({ hash }) =>
        R.isEmpty(hash) ? Promise.resolve({}) : IPFS.getContent(hash),
      consultantsBlockchainData
    )
  )

  const consultants: any = R.zipWith(
    R.merge,
    consultantsBlockchainData,
    consultantsIpfsContent
  )

  const consultantMap = R.reduce(
    (acc, index: number) =>
      consultants[index].isRemoved
        ? acc
        : R.merge(acc, { [consultants[index].hash]: consultants[index] }),
    {},
    R.range(0, consultants.length)
  )

  dispatch(setConsultants(consultantMap))
}

export const registerConsultant = (consultant: Consultant) => async (
  dispatch: any
) => {
  dispatch({ type: CONSULTANT_REGISTRATION_START })
  try {
    const hash = await IPFS.publish(consultant)
    await ConsultantsContract.addConsultant(hash)
  } catch (error) {
    console.log(`Error: ${error}`)
    dispatch(newNotificationError(error.toString()))
  }
  dispatch({ type: CONSULTANT_REGISTRATION_COMPLETE })
}

export const removeConsultant = (consultantIndex: number) => async (
  dispatch: any
) => {
  dispatch({ type: CONSULTANT_REMOVE_START })
  try {
    await ConsultantsContract.removeConsultant(consultantIndex)
  } catch (error) {
    console.log(`Error: ${error}`)
    dispatch(newNotificationError(error))
  }
  dispatch({ type: CONSULTANT_REMOVE_COMPLETE })
}
