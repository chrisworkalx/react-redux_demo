import React, { Component } from 'react';
import './style.css';
class Loading extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="loadEffect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>
        )
    }
}
export default Loading;