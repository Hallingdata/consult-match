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

export const subscribe = (privateKeyId: string, topic: string) => {
  web3.shh.subscribe(
    "messages",
    {
      privateKeyId: privateKeyId,
    },
    function(error: any, message: any, subscription: any) {
      const payload = R.compose(JSON.parse, web3.utils.hexToAscii)(message.payload)
      console.log("GOT MESSAGE!!!!!: " + JSON.stringify(payload))
    }
  )
  /*
    web3.shh.subscribe(
      "messages",
      {
        //privateKeyID:
        //  "1d14896308b73e021eda5f039d11e4d77243345b87e1cd26ae64acc38d6f9d4c",
        symKeyID:
          "3c4bb3ccd657127f5659750d25f75b9b7d1c7e7e3e1d0fa190a840f02a8bd0c4",
        topics: ["0x07678231"],
      },
      (error: any, res: any) => console.log("res: " + res + ", error: " + error)
    )

    web3.shh.subscribe(
      "messages",
      {
        ttl: 1000,
        minPow: 0.2,
        topics: ["0x07678231"],
      },
      async (error: any, message: any) => {
        console.log("message")
      }
    )
    */
}

export const sendMessage = (
  publicKey: string,
  jobHash: string,
  message: string
) => {
  const payload = {
    message,
    jobHash,
  }
  return web3.shh.post({
    pubKey: publicKey,
    ttl: 10000,
    powTarget: 0.2,
    powTime: 10,
    payload: web3.utils.asciiToHex(JSON.stringify(payload)),
  })
}

export const getWhisperTopicForJob = (jobSwarmHash: string) => "0x07678231"
// web3.utils.asciiToHex(jobSwarmHash)
