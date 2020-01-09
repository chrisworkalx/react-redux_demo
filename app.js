import React from 'react';
import ReactDom from 'react-dom';
import App from './src/views/App';
import ImagePage from './src/views/imagePage';
import Hook from './src/views/hook';
import A from './src/views/Hoc/b';
import Observable from './src/views/angular7_module/observable';
import store from './src/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二</h2>;
console.log('Running App version==> ' , VERSION); // 打印 Running App version 5fa3b9
console.log('PRODUCTION==>',PRODUCTION); // 打印 true
console.log('process.env==>', process.env); 
// 利用HashRouter解决页面跳转找不到页面问题
//或者修改webpack的配置文件，主要是配置historyApiFallback，这样跳转后在当前页面刷新就不会出现404了。
ReactDom.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" exact render={() => {
                    return <App dispatch={store.dispatch}/>
                }} />
                <Route path="/about" component={About} />
                <Route path="/users" component={Users} />
                <Route path="/image" component={ImagePage} />
                <Route path="/hook" component={Hook} />
                <Route path="/hoc" component={A} />
                <Route path="/angular_observable" component={Observable} />
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
);