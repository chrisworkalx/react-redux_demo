import React from 'react'
import A from './a'
import PropTypes from 'prop-types';

function withA(Component){
    console.log(Component, '=====Component') //=== <h2>hello world</h2>
    const ForWardedComponent = React.forwardRef((props, ref) => {
        // console.log(props, '====222props')
        // console.log(ref, '====ref')
        return (
            <div>
                <input type="text" ref={ref} />
               <Component {...props} />
           </div>
        )
    });
     class MidComponent extends React.Component {
        render() {
            const props = this.props
            console.log(props, '====props')
            return (
                <A {...props}>
                  <ForWardedComponent  ref={props.forwardedRef} {...props}/>
                </A>
            )
        }
    }
    
    //对MidComponent组件属性进行类型经查 
    MidComponent.propTypes = {
        forwardedRef: PropTypes.object,
    }
    return  MidComponent
}
export {
    withA,
}