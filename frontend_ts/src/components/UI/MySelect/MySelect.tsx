import "./MySelect.css" 

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
    <div className="myselect-container">
      <select
        id="underline_select"
        className="myselect peer"
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
