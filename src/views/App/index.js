import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment, increment_aysnc, thunkAction, changeShow, addList } from '../../store/actions/index';
import * as combineCreators from '../../store/actions/index';
import { Link } from "react-router-dom";
import { Dog, Dog2, Dog3, Dog4, DogT, Greeter} from '@/utils/decorator.js';
// console.log(Dog, '====dog')
console.log(new Greeter('hello').hello, '===????')
var d = new Dog();
var d2 = new Dog2();
var d3 = new Dog3();
var d4 = new Dog4();
var dt = new DogT();
console.log(d.bark(), '-----------d.bark()')
console.log(d2.isDoge, '-----------d.isDoge') //实例访问不到
console.log(Dog2.isDoge, '-----------Dog2.isDoge')
console.log(d3.isDoge, '-----------d3.isDoge') //实例访问不到
console.log(Dog3.isDoge, '-----------Dog3.isDoge')
d4.eat();
console.log('=============================================================')
dt.peeInRoom()
dt.peeInBed()
// d4.eat = '我要更改？？'  //不可以变更
// d.bark = 'hhhhhh' //不可以变更
// console.log(bindActionCreators, '====bindActionCreators')
// console.log(combineCreators, '====combineCreators')
class App extends React.Component {

    constructor(props) {
        super(props);
        const { dispatch } = props;
        // console.log(dispatch, '=====aaaaa')
        this.bindCombineActions = bindActionCreators(combineCreators, dispatch);
        // console.log(this.bindCombineActions, '=======bbbbbb')
        this.state = {
            styleSpan: {
                display: 'inline-block',
                padding: '5px',
                color: '#fff',
                background: '#f40'
            }
        }
    }

    render() {
        // const { number, count, addItem, sagaClick, thunkClick, showClick, list, addItemList, isDisplay } = this.props;
        const { number, count, list, isDisplay, listActions } = this.props;
        console.log(listActions, '====listActions')
        const { addItem, sagaClick, thunkClick, showClick, addItemList } = listActions;
        console.log(thunkClick, '=====thunkClick')
        return (
            <div>
                <div>react-router 测试</div>
                <nav>
                    <ul>
                    <li>
                        <Link to="/childOne">childOne页面</Link>
                    </li>
                    <li>
                        <Link to="/about">页面一</Link>
                    </li>
                    <li>
                        <Link to="/users">页面二</Link>
                    </li>
                    <li>
                        <Link to="/image">获取图片page</Link>
                    </li>
                    <li>
                        <Link to="/hook">Hook_study</Link>
                    </li>
                    <li>
                        <Link to="/hoc">高阶函数</Link>
                    </li>
                    <li>
                        <Link to="/angular_observable">angular7_observable</Link>
                    </li>
                    </ul>
                </nav>
                <div>redux & redux-saga测试</div>
                <div style={{color: 'purple', fontSize: '30px',fontWeight: 'bold'}}>current number： {number} 
                    <button onClick={addItem}>点击+1</button><em> </em>
                    <button onClick={sagaClick}>触发saga</button> <em></em>
                    <button onClick={() => thunkClick(2)}>触发redux-thunk</button> <em></em>
                    <button onClick={showClick}>控制list列表显隐</button> <em></em>
                    <button onClick={() => addItemList({
                        name: `王${parseInt(Math.random() * 100)}二`,
                        age: parseInt(Math.random() * 100),
                    })}>list列表增条目</button> <em></em>
                </div>
                <div style={{'marginTop': '50px'}}>
                    <p>
                        <button onClick={() => this.bindCombineActions.increment(6)}>启用bindCreatorActions(increment方法)</button>
                    </p>
                    <p>
                        <button onClick={() => this.bindCombineActions.increment_aysnc(3)}>启用bindCreatorActions(increment_aysnc方法)</button>
                    </p>
                    <p>
                        <button onClick={this.bindCombineActions.changeShow}>启用bindCreatorActions(changeShow方法)</button>
                    </p>
                </div>
                <span style={this.state.styleSpan}>{count}</span>
                <p>muReducer中的list列表</p>
                <ul>
                    {
                        isDisplay && list.map((item, i) => {
                            return (
                                <li key={i}>
                                    姓名: <span>{item.name}</span>
                                    <br/>
                                    年龄: <span>{item.age}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state, x, y,z) => {
    console.log(x, '====x');
    console.log(y, '====y');
    console.log(z, '====z');
    console.log(Array.apply(null, {length: 30}).map(function() {
        return '❄️'
    }).join('🥁'));
    console.log(state, '=====state');
    const { incrementReducer: { count, number }, myReducer: { list, isDisplay }} = state;
    return {
        number,
        count,
        list,
        isDisplay
    }
};
const mapDispatchToProps = (dispatch,b,c,d) => {
    console.log(b, '=====b');
    console.log(c, '=====c');
    console.log(d, '=====d');
    console.log(Array(40).fill('🔥').join('>'));
     
    var listActions = bindActionCreators(combineCreators, dispatch);
    console.log(listActions, '=======iiiiii')
    listActions.addItem = () => dispatch(increment(2));
    listActions.sagaClick = () => dispatch(increment_aysnc(5));
    listActions.thunkClick =  n => dispatch(thunkAction(n));
    listActions.showClick = () => dispatch(changeShow());
    listActions.addItemList =  item => dispatch(addList(item));
    return {
        listActions
    };
    // return {
    //     addItem:() => dispatch(increment(2)),
    //     sagaClick: () => dispatch(increment_aysnc(5)),
    //     thunkClick: n => dispatch(thunkAction(n)),
    //     showClick: () => dispatch(changeShow()),
    //     addItemList: item => dispatch(addList(item))
    // };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { o: 'red'}
)(App);