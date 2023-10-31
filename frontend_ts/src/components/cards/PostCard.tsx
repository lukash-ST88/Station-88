import ArticlePost from "../postCards/ArticlePost";
import MoviePost from "../postCards/MoviePost";
import ProjectPost from "../postCards/ProjectPost";

interface IPostIndexProps {
    post: any
    index: number
}

const PostCard = (props:IPostIndexProps) => {
    if (props.post.type === 'movie') {
        return(
            <MoviePost movie={props.post} index={props.index}/>
        )
    } 
    else if (props.post.type === 'article'){
        return <ArticlePost article={props.post} index={props.index}/>
    } 
    else if (props.post.type === 'project'){
        return <ProjectPost project={props.post} index={props.index}/>
    } 
    else {
        return <div>Неизвестный пост</div>
    }

};

export default PostCard;
