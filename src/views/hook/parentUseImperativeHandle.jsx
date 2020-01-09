import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import FancyInput from './useImperativeHandle';
import PublicUseJxs from './use';

class ParentUseInperativeHandle extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.inputRef2 = createRef();
    }
    componentDidMount() {
        console.log(findDOMNode, '====findDOMNode')

        var getParentDom = findDOMNode(this.inputRef2.current);
        var opCollection = Array.from(getParentDom.children);
        var reg = /^P/gi;
        opCollection = opCollection
        // .map(v => v.toString())
        .filter(item => reg.test(item.nodeName));
        opCollection.forEach(item => item.style.fontSize = '30px')
        console.log(opCollection, '======opCollection')
        console.log(getParentDom, '=====getParentDom')
        console.log(getParentDom.children);
        console.log(getParentDom.innerHTML);
        console.log(getParentDom.outerHTML);
        getParentDom.style.color = "#f99";
    }
    imperativeHandleClick = () => {
        this.inputRef.current.focus();
    }
    render() {
        return (
            <>
                <FancyInput ref={this.inputRef} />
                <br/>
                <PublicUseJxs ref={this.inputRef2} />
                <br/>
                <p>
                    <span>名字</span>：
                    <input type="text" />
                </p>
                <br/>
                <button onClick={this.imperativeHandleClick}>由ImperativeHandle暴露给父组件的自定义focus方法暴露</button>
                <br/>
                <button onClick={() => this.inputRef.current.layer()}>由ImperativeHandle暴露给父组件的自定义layer方法暴露</button>
            </>
        )
    }

}
export default ParentUseInperativeHandle;