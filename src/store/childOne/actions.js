import * as types from './types';
export const childone_add = payload => {
    return {
      type: types.ADD_ITEM,
      payload
    };
  };
export const childone_del = payload => {
    return {
      type: types.DEL_ITEM,
      payload
    };
  };