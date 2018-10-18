import Web3 from "../../integrations/web3"

export const SET_DEFAULT_ETH_ADDRESS = "SET_DEFAULT_ETH_ADDRESS"
export const SET_NETWORK_STATUS = "SET_NETWORK_STATUS"

const setDefaultEthAccount = (account: string) => ({
  type: SET_DEFAULT_ETH_ADDRESS,
  account,
})

const setNetwork = (network: string) => ({
  type: SET_NETWORK_STATUS,
  network,
})

export const fetchDefualtEthAddress = () => async (dispatch: any) => {
  const defaultAccounts = await Web3.eth.getAccounts()
  return dispatch(setDefaultEthAccount(defaultAccounts[0]))
}

export const checkNetwork = () => async (dispatch: any) => {
  try {
    await Web3.eth.net.isListening()
    const currentNetwork = await (Web3 as any).eth.net.getNetworkType()
    return dispatch(setNetwork(currentNetwork))
  } catch (e) {
    console.log("Wow. Something went wrong")
    return dispatch(setNetwork("not connected"))
  }
}

export const checkProvider = () => async (dispatch: any) => {
  try {
    await Web3.eth.net.isListening()
  } catch (e) {
    console.log("Wow. Something went wrong")
  }
}
