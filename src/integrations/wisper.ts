import web3 from "./web3"

/**
 * getMyKeyPair() =>
 * 1. sign a message pre set message: (web3.eth.sign(dataToSign, address [, callback]))
 * 2. use the signature to create a shh.keyPair: web3.shh.generateSymKeyFromPassword(password, [callback])
 */

/**
 * sendMessage: shh.post({ "from": myIdentity, "to": recipient, "topic": t, "payload": p });
 */

export const getMyKeyPair = (password: string) =>
  web3.shh.generateSymKeyFromPassword(password)

export const sendMessage = (
  from: string,
  to: string,
  topic: string,
  payload: any
) => web3.shh.post({ from, to, topic, payload })
