import web3 from "./web3"

/**
 * Generate a "chat" key.
 *
 * @returns keyId for a Whisper key.
 */
export const generateKeyPar = async () => {
  const defaultAccount = (await web3.eth.accounts)[0]
  const signature = await web3.eth.sign(
    defaultAccount,
    JSON.stringify({ info: "create chat keys" })
  )
  const keyId: string = await web3.shh.generateSymKeyFromPassword(signature)
  return keyId
}

export const getPublicKey = web3.shh.getPublicKey

export const sendMessage = (
  from: string,
  to: string,
  topic: string,
  payload: any
) => web3.shh.post({ from, to, topic, payload })
