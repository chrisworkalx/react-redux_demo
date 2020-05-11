import initialState from './state';
import * as types from './types';
export const childOneReducer = (state = initialState, action) => {
    console.log(action, '====myreducer_actions')
    const { type, payload} = action;
    switch(type) {
      case types.ADD_ITEM: {
        return {
            ...state,
            num: state.num + payload
        }
      };
      case types.DEL_ITEM: {
        return {
            ...state,
            num: state.num - payload
        }
      };
      default: return state;
    }
  };