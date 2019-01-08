const fileReaderPullStream = require("pull-file-reader")
const IPFS = require("ipfs-http-client")

const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

export const publish = (content: any) => {
  return ipfs
    .add(ipfs.types.Buffer.from(JSON.stringify(content)))
    .then((res: any[]) => res[0].hash)
}

export const getLink = (hash: string) => "https://ipfs.infura.io/ipfs/" + hash

export const getContent = (hash: string) =>
  ipfs
    .get(hash)
    .then((res: any[]) => JSON.parse(res[0].content.toString("utf8")))

export const publishFile = (file: File) =>
  ipfs.add(fileReaderPullStream(file)).then((res: any[]) => res[0].hash)
