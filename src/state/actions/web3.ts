import Web3 from "../../integrations/web3"

export const SET_DEFAULT_ETH_ADDRESS = "SET_DEFAULT_ETH_ADDRESS"

const setDefaultEthAccount = (account: string) => ({
  type: SET_DEFAULT_ETH_ADDRESS,
  account,
})

export const fetchDefualtEthAddress = () => async (dispatch: any) => {
  const defaultAccounts = await Web3.eth.getAccounts()
  return dispatch(setDefaultEthAccount(defaultAccounts[0]))
}
