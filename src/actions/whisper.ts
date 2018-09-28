import Web3 from "../integrations/web3"
import * as R from "ramda"
import * as Whisper from "../integrations/whisper"

export const SET_WHISPER_KEY_ID = "SET_WHISPER_KEY_ID"
export const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE"

export const setWhisperKeyId = (keyId: string) => ({
  type: SET_WHISPER_KEY_ID,
  keyId,
})

export const addMessage = (message: ChatMessage) => ({
  type: ADD_NEW_MESSAGE,
  message,
})

export const init = () => async (
  dispatch: any,
  getState: any,
  whisperSubscribe: (
    privateKeyId: string,
    onMessage: (error: any, message: any, subscription: any) => void
  ) => void
) => {
  const { whisper } = getState()
  let whisperKeyId = whisper.whisperKeyId
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
  const handler = (error: any, rawMessage: any, subscription: any) => {
      const message: ChatMessage = R.compose(
      JSON.parse,
      Web3.utils.hexToAscii
    )(rawMessage.payload)
      dispatch(addMessage(message))

    console.log("GOT MESSAGE!!!!!: " + JSON.stringify(message))
  }
  whisperSubscribe(whisperKeyId, handler)
}

export const sendMessage = (
  message: string,
  toPublicKey: string,
  jobHash: string
) => async (dispatch: any, getState: any) => {
  const { whisper } = getState()
  let whisperKeyId = whisper.whisperKeyId
  Whisper.sendMessage(
    toPublicKey,
    await Whisper.getPublicKey(whisperKeyId),
    jobHash,
    message
  )
}
