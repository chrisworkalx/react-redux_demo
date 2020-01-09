import React, { Component } from 'react';
const { useState, useEffect, useLayoutEffect, useRef } = React;
function Example() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const a = useRef("xxx")
    useEffect(() => {//初始函数
        console.log(a, 'useEffect')
        // debugger;
        document.title = `You clicked ${count} times`;
        return () => {//清理函数
            console.log(a, 'end useEffect')
            // debugger;
            document.title = `remove`;
        }
    });
    useLayoutEffect(() => {//初始函数
        console.log(a, 'useLayoutEffect')
        // debugger;
        document.title = `You clicked ${count} times`;
        return () => {//清理函数
            console.log(a, 'end useLayoutEffect')
            // debugger;
            document.title += '!!!';
        }
    });
    console.log(count, '更新Example')
    return (
        //   <quoteblock>
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
            <input ref={a} value={text} onChange={function (e) {
                setText(e.target.value)
            }} />
            <span>共{text.length}个字符</span><Child />
            {/* //   </quoteblock> */}
        </div>
    );
}

class WarpperApp extends React.Component {
    state = {
        aaa: 1
    }
    onClick() {
        this.setState(function (s) {
            return {
                aaa: s.aaa + 1
            }
        })
    }
    componentDidMount() {
        console.log("app mount")
    }
    componentDidUpdate() {
        console.log("app update")
    }
    render() {
        return <div>{this.state.aaa < 10 ? <Example /> : null}
            <h1 onClick={this.onClick.bind(this)}>{this.state.aaa}</h1>
        </div>
    }
}

class Child extends React.Component {
    componentDidMount() {
        console.log("Child mount")
    }
    componentDidUpdate() {
        console.log("Child update")
    }
    render() {
        return <span>Child</span>
    }
}
export default WarpperApp;