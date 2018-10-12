import * as R from "ramda"
import web3 from "../integrations/web3"
import * as jsonInterface from "./interfaces/Consultants.json"
import * as truffleContract from "truffle-contract"

let contract: {
  numberOfConsultants: () => string
  addConsultant: any
  getConsultant: (index: number) => any
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

export const getHashesForAllConsultants = async () => {
  const contract = await getContractInstance()
  const numberOfConsultants = parseInt(await contract.numberOfConsultants())

  console.log(
    "Number of consultants in the consultants contract: " + numberOfConsultants
  )

  const consultantHashes = await Promise.all(
    R.map(
      index =>
        contract.getConsultant(index).then((_: any) => web3.utils.toAscii(_)),
      R.range(0, numberOfConsultants)
    )
  )

  return consultantHashes
}

export const addConsultant = async (consultantHash: string) => {
  const contract = await getContractInstance()

  const responds = await contract.addConsultant(
    web3.utils.fromAscii(consultantHash)
  )
  //.send({ gas: 99999999 })

  return responds
}
