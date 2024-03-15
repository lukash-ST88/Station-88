import ArticlePost from "../postCards/ArticlePost";
import MoviePost from "../postCards/MoviePost";
import ProjectPost from "../postCards/ProjectPost";
import BookPost from "../postCards/BookPost";
import FreePost from "../postCards/FreePost";

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
    else if (props.post.type === 'book'){
        return <BookPost book={props.post} index={props.index}/>
    }
    else if (props.post.type === 'free_post'){
        return <FreePost freePost={props.post} index={props.index}/>
    }
    else {
        return <div>Неизвестный пост</div>
    }

};

export default PostCard;
