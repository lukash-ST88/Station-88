import ArticlePost from "../postCards/ArticlePost";
import MoviePost from "../postCards/MoviePost";

interface IPostIndexProps {
    post: any
    index: number
}

const PostCard = (props:IPostIndexProps) => {
    if (props.post.type === 'movie') {
        return(
            <MoviePost movie={props.post} index={props.index}/>
        )
    } else if (props.post.type === 'article'){
        return <ArticlePost article={props.post} index={props.index}/>
    } else {
        return <div>nothing here</div>
    }

};

export default PostCard;
