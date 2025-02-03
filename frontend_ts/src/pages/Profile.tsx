import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { IUser } from "../interfaces/UserInterfaces";
import UserService from "../services/users";
import ArticleService from "../services/articles";
import MovieService from "../services/movies";
import ProjectService from "../services/projects";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import "./pages.css"
import { IArticle} from "../interfaces/ArticleInterfaces";
import { IMovie } from "../interfaces/MovieInterfaces";
import { IProject } from "../interfaces/ProjectInterfaces";
import ProfileDataDivision from "../components/divisions/profile/profileDataDivision";
import ProjectListDivision from "../components/divisions/profile/projectListDivision";
import ArticleListDivision from "../components/divisions/profile/articleListDivision";
import MovieListDivision from "../components/divisions/profile/movieListDivision";
import ManageProfileDivision from "../components/divisions/profile/manageProfileDivision";

const Profile = () => {
    const [user, setUser] = useState<IUser>();
    const params = useParams<string>();
    const navigate = useNavigate();

    const [searchArticles, setSearchArticles] = useState<string>("");
    const [searchMovies, setSearchMovies] = useState<string>("");
    const [searchProjects, setSearchProjects] = useState<string>("");

    const [articles, setArticles] = useState<IArticle[]>([]);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
      fetchUser(params.username);
    }, []);

    useEffect(()=>{
      fetchProjects(params.username);
    }, [searchProjects])

    useEffect(()=>{
      fetchArticles(params.username);
    }, [searchArticles])

    useEffect(()=>{
      console.log('movies')
      fetchMovies(params.username);
    }, [searchMovies])

    const [fetchUser, isUserLoading, userError]: any = useFetching(
      async (username: string) => {
        const response = await UserService.getUserByUsername(username);
        setUser(response.data);
      }
    );

    const [fetchArticles, isArticlesLoading, articlesError]: any = useFetching(
      async (username: string) => {
        let response;
        if(searchArticles.length > 0){
          response = await ArticleService.getArticlesByUsernameAndTitle(username, searchArticles)
        } else {
          response = await ArticleService.getArticlesByUsername(username);
        }
        setArticles(response.data.results);
      }
    )

    const [fetchMovies, isMoviesLoading, moviesError]: any = useFetching(
      async (username: string) => {
        let response;
        if(searchMovies.length > 0 ){
          response = await MovieService.getMovieByUsernameAndTitle(username, searchMovies)
        } else {
          response = await MovieService.getMoviesByUsername(username);
        }
        setMovies(response.data.results);
      }
    )

    const [fetchProjects, isProjectsLoading, projectsError]: any = useFetching(
      async (username: string) => {
        let response;
        if(searchProjects.length > 0){
          response = await ProjectService.getProjectsByUsernameAndTitle(username, searchProjects)
        } else {
          response = await ProjectService.getProjectsByUsername(username);
        }
        setProjects(response.data.results);
      }
    )


    return (
      <>
        <title> Профиль </title> 
        <meta name="description" content={`Профиль пользоватля: ${user?.username}`}/>

        {isUserLoading ? (
          <Loader />
        ) : (
          <>
            <ProfileDataDivision user={user!}/>
            {user?.is_staff && 
              <>
                <ProjectListDivision projects={projects} searchProjects={searchProjects} setSearchProjects={setSearchProjects}/>
                <ArticleListDivision articles={articles} searchArticles={searchArticles} setSearchArticles={setSearchArticles}/>
                <MovieListDivision movies={movies} searchMovies={searchMovies} setSearchMovies={setSearchMovies}/>
              </>
            }
            <ManageProfileDivision user={user}/>
          </>
        )}
      </>
  );
};

export default Profile;
