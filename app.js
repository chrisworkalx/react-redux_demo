import React from 'react';
import ReactDom from 'react-dom';
import App from './src/views/App';
import ChildOne from './src/views/childOne';
import ImagePage from './src/views/imagePage';
import LifeCycle from './src/views/lifeCycle';
import Hook from './src/views/hook';
import A from './src/views/Hoc/b';
import Observable from './src/views/angular7_module/observable';

//缓存机制学习，防止页面刷新store数据初始化
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './src/store';


import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const { useState, useEffect, useLayoutEffect, useRef } = React;
let obj = {};
let n;
Object.defineProperty(obj, 'name', {
    set(v) {
        n = v;
    },
    get() {
        return n;
    }
});

const randomGetNum = (a = 4) => (b = 10) => {
    obj.name = Math.round(Math.random() * (a - b) + b);
}


const About = () => {
    const [count, setCount] = useState(n);
    useEffect(() => {//初始函数
        console.log('开始了，挂载完毕！');
        return () => {//清理函数
            console.log('我是HOOKs父组件。。。销毁组件中')
        }
    }, []);
    return (
        <div>
            <h2>页面一</h2>
            <p>number:&nbsp;{count}</p>
            <button onClick={() => {
                randomGetNum()()
                setCount(n)
            }}>随机数</button>
            <LifeCycle count={count} />
        </div>
    )
};


randomGetNum()();

const Users = () => <h2>页面二</h2>;
console.log('Running App version==> ', VERSION); // 打印 Running App version 5fa3b9
console.log('PRODUCTION==>', PRODUCTION); // 打印 true
console.log('process.env==>', process.env);
console.log(BBB, '========aa');
// 利用HashRouter解决页面跳转找不到页面问题
//或者修改webpack的配置文件，主要是配置historyApiFallback，这样跳转后在当前页面刷新就不会出现404了。
ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => {
                        return <App dispatch={store.dispatch} a={20} />
                    }} />
                    <Route path="/about" component={About} />
                    <Route path="/childOne" render={() => {
                        return <ChildOne name={'ownProps获取的name'} />
                    }} />
                    <Route path="/users" component={Users} />
                    <Route path="/image" component={ImagePage} />
                    <Route path="/hook" component={Hook} />
                    <Route path="/hoc" component={A} />
                    <Route path="/angular_observable" component={Observable} />
                </Switch>
            </Router>
        </PersistGate>

    </Provider>,
    document.getElementById('root')
);