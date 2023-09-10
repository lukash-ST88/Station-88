interface Options {
  value: string;
  name: string;
}

interface MySelectOPtionsProps {
  options: Options[];
  defaultValue: string;
  value: string;
  onChange(selectedSort: any): void;
}

const MySelect = (props: MySelectOPtionsProps) => {
  return (
    <div>
      {/* <select
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <option disabled value="">
          {props.defaultValue}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select> */}
      {/* <label htmlFor="underline_select" className="sr-only">
        Underline select
      </label> */}
      <select
        id="underline_select"
        className="block py-2.5 mx-2.5 w-full text-xl text-gray-500 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none hover:text-red-600 focus:ring-0 focus:border-red-600 peer"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <option disabled value="">
          {props.defaultValue}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
