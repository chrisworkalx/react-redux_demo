import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    const { incrementReducer: { number } } = state;
    return {
        number,
        title: '我是child1传递过来的'
    }
}
const mapDispatchToProps = dispatch => ({});

@connect(mapStateToProps,mapDispatchToProps,null, {forwardRef: true}) //必须传forwardRef为true 才可以父级调子组件的方法
export default class extends Component {
    constructor(props) {
        console.log(props, '====props')
        super(props)
    }

    print() {
        console.log('我是child3，要准备打印了');
    }

    render() {
        const { number, title } = this.props;
        const {handle} = this.props;
        return (
            <div>
                <div style={{ 'border': 'solid blue 2px' }}>
                    <h1 style={{ color: 'green', fontSize: '20px' }}>我是child3</h1>
                    <p>{title}</p>
                    <p>{number}</p>
                    <button onClick={() => handle('哈哈哈哈')}>handle</button>
                </div>
            </div>
        )
    }
}