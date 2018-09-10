import {
    SET_CONSULTANTS_ARRAY,
  } from "../actions/consultants"
  
  const initialState = {
    consultants: {},
    initialLoaded: false
  }
  
  export const consultantReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_CONSULTANTS_ARRAY:
        return Object.assign({}, state, {
          consultants: action.consultants,
          initialLoaded: true
        })
      default:
        return state
    }
  }
  