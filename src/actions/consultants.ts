import * as Swarm from "../integrations/swarm"
import * as R from "ramda"
import * as ConsultantsContract from "../contracts/Consultants"

export const SET_CONSULTANTS_ARRAY = "SET_CONSULTANTS_ARRAY"

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

export const addConsultant = (consultant: Consultant) => async (
  dispatch: any
) => {
  const hash = await Swarm.publish(consultant)
  await ConsultantsContract.addConsultant(hash)
  dispatch(fetchAllConsultants())
}
