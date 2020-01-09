import React, { useReducer, useCallback, useState } from 'react';
import { incrementReducer } from '@/store/reducers';

const set = new Set();
function LineOriginWrap ({initialState}) {
    const [count, setCount] = useState(2)
    const [state, dispatch] = useReducer(incrementReducer, initialState);	
    const clickAction = useCallback(() => {
        console.log(count)
    },[count]);
    set.add(clickAction)
    return (
        <>
            <p style={{'padding': '5px', 'background': '#f40', 'display': 'inline-block'}}>{state.number}</p>
            <div>set.size:&nbsp;{set.size}</div>
            <div>count: &nbsp;{count}</div>
            <p>
                <button 
                onClick={
                    () => dispatch({type: 'INCREMENT', payload: 2})
                    }>
                react_Hook加法
                </button>
            </p>
            <p>
                <button 
                onClick={
                    () => setCount(count + 1)
                    }>
                useCallback
                </button>
            </p>
        </>
    )
}
export default LineOriginWrap;