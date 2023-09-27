import { IArticleIndexProps } from "../cards/ArticleCard"

const ArticlePost = (props: IArticleIndexProps)=> {
    return(<div>
        <div style={{background: 'red'}}>{props.article.title}</div>
    </div>)
}

export  default ArticlePost