import MyInput from "../../UI/MyInput/MyInput"
import MySelect from "../../UI/MySelect/MySelect"
import React, { useState } from "react"
import MyDatePicker from "../../UI/DatePicker/DatePicker"
import { IPostCategory, postCategories } from "../../../utils/hardData"
import { ISearchDate } from "../../../interfaces/RestInterfaces"



interface FilterProps {
    search: string
    setSearch(arg: string): void
    postCategory: string,
    setPosts(posts: any): void,
    setPostCategory(selectedCategory: string): void,
    setOffset(offset: number): void,
    searchDateTime: ISearchDate,
    setSearchDateTime(arg: ISearchDate): void
}

const PostFilter = (props: FilterProps) => {
    return (
        <>
            <div className="lg:mx-2 flex lg:block">
                <MyInput 
                    value={props.search} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setSearch(event.target.value)}
                />
                <MySelect
                    value={props.postCategory}
                    onChange={(selectedCategory) => {
                        props.setPosts([]);
                        props.setPostCategory(selectedCategory);
                        props.setOffset(0);
                    }}
                    defaultValue="Категория"
                    options={postCategories.map((category: IPostCategory)=>{
                        return {value: category.slug, name: category.name}
                    })}
                    
                />
            </div>
            <MyDatePicker searchDateTime={props.searchDateTime} setSearchDateTime={props.setSearchDateTime} className="mx-2 mt-2 lg:mx-0 lg:pl-4 lg:mt-2 "/>
        </>
    )
}

export default PostFilter;