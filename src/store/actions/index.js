// import { bindActionCreators} from 'redux';
export const increment = payload => {
    return {
      type: 'INCREMENT',
      payload
    };
  };
export const increment_aysnc = payload => {
    return {
      type: 'INCREMENT_ASYNC',
      payload
    };
  };
export const addList = payload => {
    return {
      type: 'CHANGE_LIST',
      payload
    };
  };
export const changeShow = () => {
    return {
      type: 'CHANGE_SHOW'
    };
  };

  export const thunkAction = payload => {
      return (dispatch, getState) => {
        console.log(getState(), '=====getState');
        var n = parseInt(Math.random() * 10);
        if (n > 5) {
            console.log(n, '======随机数大鱼5的n');
            dispatch(increment(n+payload))
        } else {
            console.log(n, '======小于5的随机数')
            dispatch(increment(n+payload))
        }
      }
  }
