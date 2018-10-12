import * as R from "ramda"
import web3 from "../integrations/web3"
import * as jsonInterface from "./interfaces/Jobs.json"
import * as truffleContract from "truffle-contract"

let contract: {
  numberOfJobs: () => string
  addJob: any
  getJob: (index: number) => any
  markJobComplete: (index: number) => any
}

const getContractInstance = async () => {
  const defaultAccount = (await web3.eth.getAccounts())[0]

  if (contract == null) {
    const contractLoader = truffleContract(jsonInterface)
    contractLoader.setProvider(web3.eth.currentProvider)
    contractLoader.defaults({
      from: defaultAccount,
    })

    contract = await contractLoader.deployed()
  }
  return contract
}

export const getHashesForAllJobs = async () => {
  const contract = await getContractInstance()

  const numberOfJobs = parseInt(await contract.numberOfJobs())

  console.log("Number of jobs in the jobs contract: " + numberOfJobs)

  const jobHashes: any = await Promise.all(
    R.map(
      index =>
        contract.getJob(index).then((_: any) => {
          console.log(_)
          return {
            hash: web3.utils.toAscii(_[0]),
            done: _[1],
            owner: _[2],
            jobIndex: index,
          }
        }),
      R.range(0, numberOfJobs)
    )
  )

  return jobHashes as Promise<
    { hash: string; done: boolean; owner: string; jobIndex: number }[]
  >
}

export const postJob = async (jobHash: string) => {
  const contract = await getContractInstance()

  const responds = await contract.addJob(web3.utils.fromAscii(jobHash))
  //.send({ gas: 99999999 })
  return responds
}

export const markJobComplete = async (jobIndex: number) => {
  const contract = await getContractInstance()

  const responds = await contract.markJobComplete(jobIndex)
  //.send({ gas: 99999999 })
  return responds
}
