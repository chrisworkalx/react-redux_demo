import React, { Component, createRef } from 'react';
import { findDOMNode } from 'react-dom';
class A extends Component {

    constructor(props) {
        super(props);
        this.divRef = createRef();
    }
    componentDidMount() {

        var getDomA = findDOMNode(this.refs.div);//获取dom-A元素
        var getDomB = findDOMNode(this.divRef.current);//获取dom-B元素
        var getDomC = findDOMNode(this.iDiv);//获取dom-C元素
        getDomA.style.color = 'red';
        getDomB.style.color = 'purple';
        getDomC.style.color = 'blue';
        // this.divRef.current.style.color = 'purple'; //也可以
        // this.refs.div.style.color = 'orange'; //可以操作
        // this.iDiv.style.color="blue"; //可行
    }
    render() {
        return (
            <div>
                <div ref='div'>我是父组件A----A开始</div>
                <div ref={this.divRef}>我是父组件B----B开始</div>
                <div ref={node => this.iDiv = node}>我是父组件C----C开始</div>
                {this.props.children}
                <div>我是父组件A————结束</div>
            </div>
        )
    }
}
export default A;