import React, { Component } from 'react';
import { sum } from '~image/a.js';
// import Dog from '@/utils/decorator.js';
import catSrc from '~image/hand.png';
import hillSrc from '~image/hill.jpeg';
import signSrc from '~image/sign1.png';
// var listArr = require.context('../../../static/images', false, /\.png$/).keys();
var path = require('path');

var listArr = require.context('~image', false, /\.png$/).keys();
// var baseUrl = "/Users/ex-yaomingfei001/Documents/js_demo/react/react_project/static/images"
var baseUrl = "static/images"
listArr = listArr.map((item,i,arr) => {
    item = `${baseUrl}${item.slice(1)}`;
    return item;
})
console.log(listArr, '=====listArr')
// console.log(Dog, '=====Dog')
class ShowImagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageList: listArr
        }
    }

    componentDidUpdate() {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }

    render() {
        console.log(sum(), '=======')
        return (
            <div>
                <div>要通过require.context去获取文件夹中相关的图片</div>
                <img src={catSrc} alt="" />
                <img src={hillSrc} alt=""/>
                <img src={signSrc} alt=""/>
                <br />
                <br />
                <ul>
                    {
                        this.state.imageList.map((item, i) => {
                            return (
                                <li key={i}>
                                   {item}
                                   <img src={item} alt=""/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ShowImagePage;