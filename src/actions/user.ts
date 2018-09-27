import Web3 from "../integrations/web3"
import * as R from "ramda"
import * as Whisper from "../integrations/whisper"

export const SET_WHISPER_KEY_ID = "SET_WHISPER_KEY_ID"

export const setWhisperKeyId = (keyId: string) => ({
  type: SET_WHISPER_KEY_ID,
  keyId,
})

export const initWhisper = () => async (
  dispatch: any,
  getState: any,
  whisperSubscribe: (
    privateKeyId: string,
    onMessage: (error: any, message: any, subscription: any) => void
  ) => void
) => {
  const { user } = getState()
  let whisperKeyId = user.whisperKeyId
  if (R.empty(whisperKeyId)) {
    whisperKeyId = await Whisper.generateKeyParFromEthAccountSignature()
    await dispatch(setWhisperKeyId(whisperKeyId))
  } else {
    try {
      // check that the old key is still available
      await Whisper.getPublicKey(whisperKeyId)
    } catch (error) {
      whisperKeyId = await Whisper.generateKeyParFromEthAccountSignature()
      await dispatch(setWhisperKeyId(whisperKeyId))
    }
  }
  console.log(
    "whisperKeyId: " +
      whisperKeyId +
      ", publicKey: " +
      (await Whisper.getPublicKey(whisperKeyId))
  )
  const handler = (error: any, message: any, subscription: any) => {
    const payload = R.compose(
      JSON.parse,
      Web3.utils.hexToAscii
    )(message.payload)
    console.log("GOT MESSAGE!!!!!: " + JSON.stringify(payload))
  }
  whisperSubscribe(whisperKeyId, handler)
}

export const sendMessage = (
  message: string,
  toPublicKey: string,
  jobHash: string
) => async (dispatch: any, getState: any) => {
  const { user } = getState()
  let whisperKeyId = user.whisperKeyId
  Whisper.sendMessage(
    toPublicKey,
    await Whisper.getPublicKey(whisperKeyId),
    jobHash,
    message
  )
}
