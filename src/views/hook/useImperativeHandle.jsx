import React, { forwardRef, useImperativeHandle, useRef } from 'react';
function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        layer: () => {
            alert('我是自定义layer方法！！！！')
        }
    }))
    return <input type="text" ref={inputRef} />
}

FancyInput = forwardRef(FancyInput);
export default FancyInput;