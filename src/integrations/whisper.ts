import * as R from "ramda"
import web3 from "./web3"
const Hashes = require('jshashes')
const SHA256 =  new Hashes.SHA256


const shh: any = web3["shh"]
/**
 * Generate a "chat" key.
 *
 * @returns keyId for a Whisper key.
 */
R.map(console.log, R.keys(shh))
shh
  .generateSymKeyFromPassword("Never use this password - password!")
  .then((_: any) => console.log("generateSymKeyFromPassword res: " + _))

export const generateKeyParFromEthAccountSignature = async () => {
  const defaultAccount = (await web3.eth.getAccounts())[0]
  const signature = await web3.eth.sign(
    JSON.stringify({ info: "create chat keys" }),
    defaultAccount
  )
  const keyId = await shh.addPrivateKey("0x" + SHA256.hex(signature))
  return keyId
}

export const getPublicKey = web3.shh.getPublicKey

export const sendMessage = (
  from: string,
  to: string,
  topic: string,
  payload: any
) => web3.shh.post({ from, to, topic, payload })

export const getWhisperTopicForJob = (jobSwarmHash: string) =>
  web3.utils.asciiToHex(jobSwarmHash)
