import React from 'react'
//假设withA存储于withA.js文件。
import { withA }   from  './index'  
const B = props => {
    console.log(props, '====h标签props')
    return <h2 style={props.style}>hello world</h2>
}
const B2 = withA(B)
class BB extends React.Component {
      constructor(props) {
          console.log(props, '====props_from -hook');
        super(props)
        // this.forwardedRef = React.createRef();  
        this.forwardedRef = props.forwardRef; 
        this.state = {
            style: {
                color: 'red'
            }
        }    
        }
        componentDidMount() {
        //    this.forwardedRef.current.focus();
        }
        render() {
           return(
            <div>
                {/* <input type="text" ref={node =>this.forwardedRef = node } /> */}
                {/* <input type="text" ref={this.forwardedRef} /> */}
                <B2  forwardedRef={this.forwardedRef} {...this.state}/>
            </div>
           )
        }
}
export default BB;