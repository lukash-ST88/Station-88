import { forwardRef } from "react";
import "./MyInput.css";

interface PropsProps {
  value: string;
  onChange(func: any): void;
}

const MyInput = forwardRef((props: PropsProps, ref: any) => {
  return (
    <div>
      <div className="relative z-0 w-full mb-6 group m-2">
        <input
          {...props}
          ref={ref}
          type="text"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Поиск
        </label>
      </div>
    </div>
  );
});

export default MyInput;
