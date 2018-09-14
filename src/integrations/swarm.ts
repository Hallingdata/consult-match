import * as console from "console"
const gateway = "http://home.asgeir.me:3033/bzz:/"

export const publish = (content: any) =>
  fetch(gateway, {
    method: "POST",
    body: JSON.stringify(content),
  }).then(_ => _.text())

export const getLink = (hash: string) => gateway + hash

export const getContent = async (hash: string) =>
  fetch(gateway + hash)
    .then(_ => _.json())
    .catch(reason => ({
      error: "Consultant data from Swarm not available for this consultant",
    }))

export const publishFile = (file: File) => {
  return fetch(gateway, {
    method: "POST",
    body: file,
  }).then(_ => _.text())
}
