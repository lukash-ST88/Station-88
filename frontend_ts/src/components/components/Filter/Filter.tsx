import MyInput from "../../UI/MyInput/MyInput"
import { useState } from "react"
import MySelect from "../../UI/MySelect/MySelect"
import React from "react"
import { IFilter } from "../../../pages/Movies"


interface FilterProps {
    filter: IFilter,
    setFilter(arg: IFilter): void
}

const Filter = (props: FilterProps) => {
    

    return (
    <div className="m-2">
        <MyInput 
        value={props.filter.query} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFilter({ ...props.filter, query: event.target.value })}
        />
        <MySelect
        value={props.filter.sort}
        onChange={(selectedSort) => {
          console.log(selectedSort);
          props.setFilter({ ...props.filter, sort: selectedSort });
        }}
        defaultValue="Сортиовка"
        options={[
          { value: "+release_date", name: "по дате - новые"},
          { value: "+year", name: "по году - новые"},
          { value: "-year", name: "по году - старые" },
          { value: "=release_date", name: "по дате - старые" }
        ]}
      />
    </div>)
}

export default Filter