import * as R from "ramda"
import { SET_DEFAULT_ETH_ADDRESS } from "../actions/web3"

type State = {
  defaultEthAddress: string
}

const initialState: State = {
  defaultEthAddress: "",
}

export const web3Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DEFAULT_ETH_ADDRESS:
      return R.merge(state, { defaultEthAddress: action.account })
    default:
      return state
  }
}
