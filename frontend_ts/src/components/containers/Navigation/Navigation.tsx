import {Link} from 'react-router-dom'
import { connect} from "react-redux";  
import "./Navigation.css"
import { ModalRS } from '../../components/Modal/Modal'


interface IUsernameEmail {
    username: string
    email: string
}

interface IIsAuhtenticatedUser {
    isAuthenticated: boolean
    user: IUsernameEmail
}

interface IAuthProps {
    auth: IIsAuhtenticatedUser
}

function Navigation(props: IAuthProps){

    return (
        <nav>
            <div className='flex flex-wrap justify-around items-center md:flex-nowrap md:gap-10'>
                <Link to='#' className=''><img className='img-links' src='/images/Durica_v2.jpg'></img></Link>
                <Link to='/articles' className='nav-links'>Статьи</Link>
                <Link to='/movies' className='nav-links'>Фильмы</Link>
                <Link to='/' className='station88'> STATION 88 </Link>
                <Link to='#' className='nav-links'>Образование</Link>
                <Link to='/projects' className='nav-links'>Проекты</Link>
                {props.auth.isAuthenticated 
                ? <Link to='#' className='nav-links'>{props.auth.user.username}</Link>
                : <div className='nav-links'><ModalRS/></div>
                } 
            </div>
        </nav>
    )
}
const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth,
  });


export default connect(mapStateToProps)(Navigation);  

// <Link to='/login' className='nav-links'>Профиль</Link> 

// TODO: - delete packages bootstrap and reactstrap