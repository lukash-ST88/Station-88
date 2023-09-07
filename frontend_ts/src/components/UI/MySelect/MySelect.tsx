
interface Options {
    value: string,
    name:  string,
}

interface MySelectOPtionsProps {
    options: Options[],
    defaultValue: string,
    value: string,
    onChange(selectedSort: any): void 
}

const MySelect = (props: MySelectOPtionsProps) => {
    return (
      <select value={props.value} onChange={(event) => props.onChange(event.target.value)}>
        <option disabled value="">
          {props.defaultValue}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  
  export default MySelect;