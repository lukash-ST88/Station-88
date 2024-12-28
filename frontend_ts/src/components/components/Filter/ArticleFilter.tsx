import MyInput from "../../UI/MyInput/MyInput"
import MySelect from "../../UI/MySelect/MySelect"
import React, { useState } from "react"
import { IArticle, IArticleType } from "../../../interfaces/ArticleInterfaces"
import MyDatePicker from "../../UI/DatePicker/DatePicker"
import { ISearchDate } from "../../../interfaces/Interfaces"




interface FilterProps {
    sort: string,
    search: string
    setSearch(arg: string): void
    setSort(arg: string): void
    articleCategorySlug: string,
    setArticles(articles: IArticle[]): void,
    setArticleCategorySlug(selectedCategory: string): void,
    setOffset(offset: number): void,
    categories: IArticleType[]
    searchDateTime: ISearchDate,
    setSearchDateTime(arg: ISearchDate): void
}

const ArticleFilter = (props: FilterProps) => {
    return (
        <>
            <MyInput 
                value={props.search} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setSearch(event.target.value)}
                className="lg:px-2 pr-4"
            />
            <div className="lg:mx-2 flex lg:block">
                <MySelect
                    value={props.sort}
                    onChange={(selectedSort) => {
                        props.setSort(selectedSort);
                    }}
                    defaultValue="Сортировка"
                    options={[
                        { value: "-release_date", name: "по дате - новые"},
                        { value: "release_date", name: "по дате - старые" }
                    ]}
                />
                <MySelect
                    className=""
                    value={props.articleCategorySlug}
                    onChange={(selectedCategory) => {
                        props.setArticles([]);
                        props.setArticleCategorySlug(selectedCategory);
                        props.setOffset(0);
                    }}
                    defaultValue="Категория"
                    options={props.categories.map((category: IArticleType)=>{
                        return {value: category.url, name: category.title}
                    })}
                    
                />
            </div>
            <MyDatePicker searchDateTime={props.searchDateTime} setSearchDateTime={props.setSearchDateTime} className="mx-2 mt-2 lg:mx-0 lg:pl-4 lg:mt-2 "/>
        </>
    )
}

export default ArticleFilter;