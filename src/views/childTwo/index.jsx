import React, { Component, createRef } from 'react';


const MyIptComponent = React.forwardRef((props, ref) => {
    console.log(props, '=======MyIptComponent===props');
    return (
        <div style={{'border': 'solid #f40 2px', 'padding': '20px 30px'}}>
            <h1>我是forwardRef</h1>
            <p>{props.title}</p>
            <div>
                <span>姓名：</span>
                <input type="text" ref={ref} />
            </div>
        </div>
    )
})
export default class extends Component {
    constructor(props) {
        super(props)
        this.forwardedRef = props.forwardRef;
    }

    render() {
        return (
            <div>
                <div>
                    {/* <input type="text" ref={this.forwardedRef}/> */}
                    <MyIptComponent ref={this.forwardedRef} {...this.props} />
                </div>
            </div>
        )
    }
}