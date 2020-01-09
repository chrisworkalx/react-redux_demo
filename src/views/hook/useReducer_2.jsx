import React, { useReducer } from 'react';

function init({initialCount, name}) {	
    return {
        count: initialCount,
        name
    };	
  }	
      
  function reducer(state, action) {	
    switch (action.type) {	
      case 'increment':	
        return {count: state.count + 1};	
      case 'decrement':	
        return {count: state.count - 1};	
      case 'reset':	
        return init(action.payload);	
      default:	
        throw new Error();	
    }	
  }	
      
  function UseReducerTwoCounter(obj) {	
      const {initialCount, name } = obj;
      console.log(initialCount, '======initialCount')
      console.log(name, '======hhhhhhname');
      const obj2 = {
        initialCount,
        name
      }
    const [state, dispatch] = useReducer(reducer, obj2, init);	 //init对props传值进行初始化处理
    return (	
      <>	
    <h2>====================================usereducer传值</h2>
      name: {state.name}
      <br/>
        Count: {state.count}	
        <button	
          onClick={() => dispatch({type: 'reset', payload: initialCount})}>	
      
          Reset	
        </button>	
        <button onClick={() => dispatch({type: 'increment'})}>+</button>	
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>	
      </>	
    );	
  }
  export default UseReducerTwoCounter;