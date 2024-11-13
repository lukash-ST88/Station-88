import { forwardRef } from "react";
import "./MyInput.css";

interface PropsProps {
  value: string;
  onChange(func: any): void;
  className?: string;
}

const MyInput = forwardRef((props: PropsProps, ref: any) => {
  return (
    <div className={`w-full mx-2.5 ${props.className}`}>
      <div className="myinput-container group">
        <input
          {...props}
          ref={ref}
          type="text"
          name="floating_email"
          id="floating_email"
          className="myinput peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_email"
          className="myinput-label"
        >
          Поиск
        </label>
      </div>
    </div>
  );
});

export default MyInput;
