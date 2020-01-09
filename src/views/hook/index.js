import React, { useState, useEffect, useRef } from 'react';
import BB from '../Hoc/b';
import UseReducerCounter from './useReducer';
import UseReducerTwoCounter from './useReducer_2';
import LineCounter from './lineOriginReducer';
import UseApp from './useContext_useReducer';
import UseImperativeHandle from './parentUseImperativeHandle';
import WrapperApp from './useEffect_useLayoutEffect';

//1 用ref操作dom元素
function Counter() {
    const initialState = {
        number: 2,
        count: 0
      };
    const ref = useRef(null);
    const [count, setCount] = useState(0);

    // 如果依赖项为【】表示初始化时加载一次，【a】表示依赖项a变化时触发函数的监听
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);


    useEffect(() => {
        // document.title = `You clicked ${count} times`;
        setTimeout(() => {
            console.log(`You clicked ${count} times`);
        }, 3000);
    });
    useEffect(() => {
        if (ref.current) {
            console.log(ref.current, '=====ref.current');
            // ref.current.innerHTML = '我是ref元素绑定的数据'; 映射到内层子组件
            ref.current.focus();
        }
    },[])

    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <button onClick={handleAlertClick}>
                Show alert
            </button>
            {/* <div ref={ref}></div> */}
            <BB forwardRef={ref}/>
            <UseReducerCounter />
            <UseReducerTwoCounter initialCount={5} name="useReducer2" />
            <div>=================================================</div>
            <LineCounter initialState={initialState}/>
            <div>=================================================</div>
            <UseApp />
            {/* <Loading /> */}
            <div>=================??????????????????????====================</div>
            <UseImperativeHandle />
            <br/>
            <br/>
            <br/>
            <WrapperApp />
        </div>
    );
}
export default Counter;