import { combineReducers } from 'redux';
import childOneStore from '../childOne';
const initialState = {
    number: 0,
    count: 0
  };
  const myState = () => ({
      list: [
          {
              name: '李雷',
              age: 18
          }
      ],
      isDisplay: false
  })
  
  export const incrementReducer = (state = {
    number: 0,
    count: 0
  }, action) => {
    const { type='INCREMENT', payload} = action;
    switch(type) {
      case 'INCREMENT': {
        return {
            ...state,
            number: state.number + payload
        }
      };
      case 'INCREMENT_ASYNC': {
        return {
            ...state,
            count: state.count + payload
        }
      };
      default: return state;
    }
  };
  export const myReducer = (state = myState(), { type='CHANGE_LIST', payload}) => {
    switch(type) {
        case 'CHANGE_LIST':
        return {
            ...state,
            list: [
                ...state.list,
                payload
            ]
        };
        case 'CHANGE_SHOW': 
        return {
            ...state,
            isDisplay: state.isDisplay ? false : true
        }
        default:
        return state;
    }
  }
  const defaultReducer = combineReducers({
    incrementReducer,
    myReducer,
    child_one_reducer: childOneStore['childOneReducer']
  })
  export default defaultReducer;