import * as R from "ramda"
import web3 from "./web3"
const Hashes = require("jshashes")
const SHA256 = new Hashes.SHA256()

const shh: any = web3["shh"]
/**
 * Generate a "chat" key.
 *
 * @returns keyId for a Whisper key.
 */
export const generateKeyParFromEthAccountSignature = async () => {
  const defaultAccount = (await web3.eth.getAccounts())[0]
  const signature = await web3.eth.sign(
    JSON.stringify({ info: "create chat keys" }),
    defaultAccount
  )
  //const keyId = await shh.addPrivateKey("0x" + SHA256.hex(signature))
  const keyId = await shh.newSymKey()

  console.log("keyID: " + keyId)
  //console.log("pubkey: " + (await getPublicKey(keyId)))
  return keyId
}

export const getPublicKey = web3.shh.getPublicKey
let first = true
export const sendMessage = (
  //from: string,
  //to: string,
  //topic: string,
  payload: any
) => {
  web3.shh.post({
    //pubKey:
    //  "0x04fe5adfbc1369681a3f1f1d4086aeb4b12ca96c23a04c9fee158b65b486361b3604927e926e69debde1d5d214300c41dbd9df662b0febb10f8b093f7648cabe3b",
    symKeyID:
      "3c4bb3ccd657127f5659750d25f75b9b7d1c7e7e3e1d0fa190a840f02a8bd0c4",
    //ttl: 7,
    topic: "0x07678231",
    powTarget: 2.01,
    powTime: 2,
    payload: web3.utils.asciiToHex(payload),
  })
  /*
  web3.shh
    .post({
      symKeyID:
        "ad30b7bd3262866175a7d3a6f8e4c2122de1c843883adc4caff80bb88916a823",
      ttl: 1000,
      powTarget: 0.2,
      powTime: 1000,
      topic: "0x07678231",
      payload: web3.utils.fromAscii(JSON.stringify(payload, null, " ")),
    })
    .catch(console.error)
    */
  if (first) {
    first = false
    web3.shh
      .subscribe(
        "messages",
        {
          //privateKeyId:
          //  "1d14896308b73e021eda5f039d11e4d77243345b87e1cd26ae64acc38d6f9d4c",
          symKeyID:
            "3c4bb3ccd657127f5659750d25f75b9b7d1c7e7e3e1d0fa190a840f02a8bd0c4",
          topics: ["0x07678231"],
        },
        function(error: any, message: any, subscription: any) {
          console.log("GOT MESSAGE!!!!!: " + message)
        }
      )
      .on("data", function(message: any) {
        console.log("GOT data MESSAGE!!!!!: " + message)
      })

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
  }
}

export const getWhisperTopicForJob = (jobSwarmHash: string) =>
  web3.utils.asciiToHex(jobSwarmHash)
