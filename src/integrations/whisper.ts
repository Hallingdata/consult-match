import * as R from "ramda"
import web3 from "./web3"
const Hashes = require("jshashes")
const SHA256 = new Hashes.SHA256()

const shh: any = web3["shh"]
/**
 * Generate a "chat" key pair.
 *
 * @returns keyId for a Whisper keyPair.
 */
export const generateKeyParFromEthAccountSignature = async () => {
  const defaultAccount = (await web3.eth.getAccounts())[0]
  const signature = await web3.eth.sign(
    JSON.stringify({ info: "create chat keys" }),
    defaultAccount
  )
  const keyId = await shh.addPrivateKey("0x" + SHA256.hex(signature))
  return keyId
}
// 00a1442c185262b9d6952bbe6e89d71d16e2562f9a29be4a6c94b2bbec51d705
export const getPublicKey = web3.shh.getPublicKey

export const subscribe = (
  privateKeyId: string,
  onMessage: (error: any, message: any, subscription: any) => void
) => {
  web3.shh.subscribe(
    "messages",
    {
      privateKeyId: privateKeyId,
    },
    onMessage
  )
}

export const sendMessage = (
  toPublicKey: string,
  fromPublicKey: string,
  jobHash: string,
  message: string
) => {
  console.log("sending message")
  const payload = {
    message,
    jobHash,
    sender: fromPublicKey,
  }
  console.log(payload)
  return web3.shh.post({
    pubKey: toPublicKey,
    ttl: 10000,
    powTarget: 0.2,
    powTime: 10,
    payload: web3.utils.asciiToHex(JSON.stringify(payload)),
  })
}

export const getWhisperTopicForJob = (jobSwarmHash: string) => "0x07678231"
// web3.utils.asciiToHex(jobSwarmHash)
