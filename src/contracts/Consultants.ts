import * as R from "ramda"
import web3 from "../integrations/web3"
import * as jsonInterface from "./interfaces/Consultants.json"
import * as truffleContract from "truffle-contract"

let contract: {
  numberOfConsultants: () => Promise<string>
  addConsultant: (contentHash: string) => Promise<any>
  getConsultant: (index: number) => Promise<{ 0: any; 2: string }>
  removeConsultant: (index: number) => Promise<any>
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

export const getBlockchainDataForAllConsultants = async () => {
  const contract = await getContractInstance()
  const numberOfConsultants = parseInt(await contract.numberOfConsultants())

  console.log(
    "Number of consultants in the consultants contract: " + numberOfConsultants
  )

  const consultantHashes: any = await Promise.all(
    R.map(
      index =>
        contract.getConsultant(index).then((_: any) => {
          return {
            hash: R.isEmpty(_[0]) ? "" : web3.utils.toAscii(_[0]),
            owner: _[1],
            consultantIndex: index,
            isRemoved: R.isEmpty(_[0]),
          }
        }),
      R.range(0, numberOfConsultants)
    )
  )

  return consultantHashes as Promise<
    {
      hash: string
      owner: string
      consultantIndex: number
      isRemoved: boolean
    }[]
  >
}

export const addConsultant = async (consultantHash: string) => {
  const contract = await getContractInstance()

  const responds = await contract.addConsultant(
    web3.utils.fromAscii(consultantHash)
  )
  //.send({ gas: 99999999 })

  return responds
}

export const removeConsultant = async (consultantIndex: number) => {
  const contract = await getContractInstance()

  const responds = await contract.removeConsultant(consultantIndex)
  //.send({ gas: 99999999 })

  return responds
}
