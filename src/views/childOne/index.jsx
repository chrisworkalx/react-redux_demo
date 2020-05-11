import React, { Component, createRef} from 'react';
import { connect } from 'react-redux';
import { combineActions } from '@/store';
import ChildTwo from '@/views/childTwo';
import ChildThree from '@/views/childThree';
import pipe from 'lodash/fp/pipe';
import curry from 'lodash/fp/curry';

//createStrReplace 这个函数是柯里化 返回一个新的函数
const createStrReplace = curry((replaceCondition, replacer, str) => str.replace(replaceCondition, replacer));

// 去除./和.js字符
const removeHeadAndExt = createStrReplace(/\.\/|\.js/g, '');
// aaa/ccc/bbb/fff => aaaCccBbbFff
const toCamelName = createStrReplace(/\/([a-zA-z])/g, (...arg) => arg[1].toUpperCase());

// 首字母小写
const firstCharToLowerCase = str => str.slice(0, 1).toLowerCase() + str.slice(1);
// 将Reducer改为Store方便开发理解含义
const replaceReducerToStore = createStrReplace('Reducer', 'Store');

/**
 * 根据文件路径生成导入的模块名称
 * demo： ./aaa/ccc/bbb/fff.js => aaaCccBbbFff
 * @param path
 */

//pipe表示像管道一样执行所有条件
const formatModuleName = pipe(
	removeHeadAndExt,
	toCamelName,
	firstCharToLowerCase,
	replaceReducerToStore,
);



// var ss = "aa/bb/cc.js"
// var ss11 = createStrReplace(/\.\/|\.js/g, '')(ss);
// console.log(ss11, '====ss1111111')
// var ss2 = toCamelName(ss11);
// console.log(ss2, '===ss2222222')






const myFolder = 'product/list/detail/Reducer.js';//productListDetailStore =====finalName

var finalName = formatModuleName(myFolder);
// console.log(finalName, '=====finalName')
// console.log(combineActions, '===mmmmmmmmmmmmmmmcombineActions')
class childOne  extends Component {
    constructor(props) {
        super(props);
        this.ipt = createRef();
        this.aa = createRef();
    }

    handle(index) {
        console.log(index, '====index')
    }

    componentDidMount() {
        this.ipt.current.focus();
        this.refs.aa.print();
        // this.aa.current.print();
        console.log(this.refs.aa, '====this.aa')
        // console.log(this.aa, '=====this.aa');
    }

    render() {
        console.log(this.props, '====this.props')
        const { num, add, del, number, otherAdd, name } = this.props;
        return (
            <div>
                <div>
                    <ChildTwo forwardRef={this.ipt} {...this.props}/>
                </div>
                <h1>{name}</h1>
                <h1>我是child_one页面</h1>
                <h2 style={{'color': 'blue'}}>{num}</h2>
                <h3 style={{color: 'purple', fontSize: '30px',fontWeight: 'bold'}}>其它页面的number为：{number}</h3>
                <div>
                    <button onClick={() => add(2)}>加</button>
                </div>
                <div>
                    <button onClick={() => del(1)}>减</button>
                </div>
                <div>
                    <button onClick={() => otherAdd(9)}>调用其他页面加法</button>
                </div>
                <div>
                    <ChildThree ref="aa" handle={this.handle}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    // console.log(state, '===state')
    const {child_one_reducer: {num}, incrementReducer: {number}} = state;
    return {
        num,
        number,
        title: '我是child1传递过来的'
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    add: d => combineActions.childone_add(d),
    del: d => combineActions.childone_del(d),
    otherAdd: d => combineActions.increment(d)
});

//第三个参数不传默认就是会将所有的props进行合并
const mergeProps = (stateProps, dispatchProps,ownProps) => {
    //stateProps 是将mapStateToProps返回值作为最终输出的对象
    // console.log(stateProps, '===stateProps');
    //dispatchProps是将mapDispatchToProps返回值作为最终输出的对象
    // console.log(dispatchProps, '===dispatchProps');

    //ownProps是这个节点自身的props 如这个页面传递是name值
    // console.log(ownProps, '===ownProps');
    return Object.assign({}, {
        ...stateProps,
        ...dispatchProps,
        ...ownProps
    });
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // mergeProps,
    null,
    {forwardRef: true} //最后一个参数 如果做为高阶组件包裹其它组件使用的话  这个参数如果传空的话
    // 那么这个包裹在其中的组件就不能获取dom节点   
    //当然这里是无效的   传{}初始默认
)(childOne)