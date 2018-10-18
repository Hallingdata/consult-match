import * as R from "ramda"
import { SET_DEFAULT_ETH_ADDRESS, SET_NETWORK_STATUS } from "../actions/web3"

type State = {
  defaultEthAddress: string
  correctNetwork: boolean
  currentNetwork: string
  expectedNetwork: string
}

const initialState: State = {
  defaultEthAddress: "",
  correctNetwork: true,
  currentNetwork: "",
  expectedNetwork: "ropsten",
}

export const web3Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DEFAULT_ETH_ADDRESS:
      return R.merge(state, { defaultEthAddress: action.account })
    case SET_NETWORK_STATUS:
      return R.merge(state, {
        currentNetwork: action.network,
        correctNetwork: action.network === state.expectedNetwork,
      })
    default:
      return state
  }
}
