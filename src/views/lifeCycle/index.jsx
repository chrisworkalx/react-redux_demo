import React, { Component } from 'react';
export default class extends Component {
    constructor(props, context) {
        //初始化生命周期钩子函数
        super(props, context);
        this.state = {
            name: 'AAAAA'
        }
    }

    componentWillMount() {
        //初始化即将挂载到页面，并且执行一次
        console.log('第一次进来即将挂载🔥触发一次--->componentWillMount');
        console.log('-----------------------------------------------------');
    }
    componentDidMount() {
        // console.log(this.forceUpdate, '===this.forceUpdate');
        //这里可以对数据进行请求 ajax之类的
        //对数据的更新并触发页面重新渲染
        // this.forceUpdate(() => {
        //     setTimeout(() => {
        //         this.setState({
        //             name: 'BBBB'
        //         })
        //     }, 3000)
        // })
        console.log('初始化挂载完毕--->componentDidMount');
        console.log('-----------------------------------------------------');
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            name: nextProps.count
        }, () => {
            console.log(this.state.name, '====this.state.name');
        });
        //一般没啥用 我们可以通过this.props去更新数据
        console.log(nextProps, '===nextProps');
        console.log('从父组件接收的props即将变化--->componentWillReceiveProps')
        console.log('-----------------------------------------------------');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('这里去比较从父级改变的props等判断需不需要更新子组件--->shouldComponentUpdate');
        //出发this.setState() 去更新数据 会触发这里钩子函数
        //一般优化页面性能可能会需要这个钩子函数
        console.log(nextState.name, '====nextState.name');
        // console.log(nextProps, '\n', nextState);
        console.log('-----------------------------------------------------');
        // if(nextProps.count == nextState.name) {
        //     return false;
        // }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('数据即将去更新--->componentWillUpdate');
        // console.log(nextProps, '\n', nextState);
        console.log(nextState.name, '====nextState.name');

        console.log('-----------------------------------------------------');
    }

    componentDidUpdate(preProps, preState) {
        console.log('数据已经更新---->componentDidUpdate');
        // console.log(preProps, '\n', preState);
        console.log(preState.name, '====preState.name');
        console.log(this.state.name, '====this.state.name');

        console.log('-----------------------------------------------------');
    }

    render() {
        const { name } = this.state;
        const { count } = this.props;
        console.log('我已经准备更新页面--->render')
        return (
            <div>
                <h1>标题:我是一个生命周期页面</h1>
                <p>name:{name}</p>
                <p>props: count: &nbsp;{count}</p>
            </div>
        )
    }

    componentWillUnmount() {
        console.log('我是子组件。。页面销毁我要做什么？---->componentWillUnmount');
    }
}