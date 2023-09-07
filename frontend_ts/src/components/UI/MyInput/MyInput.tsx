import { forwardRef } from 'react';
import './MyInput.css';



interface PropsProps {
    value: string,
    onChange(func: any): void,
    placeholder: string,
}

const MyInput = forwardRef((props: PropsProps, ref: any) => {
    return (
        <input ref={ref} className='myInput' {...props}></input>
    );
})

export default MyInput;