import React, { Component } from 'react';

export default class PublicUseJxs extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }
    render() {
        return (
            <div>
                <p>
                    <span>我是公共组件</span>
                </p>
                <input type="text"/>
                <a href="">超链接</a>
            </div>
        )
    }
}