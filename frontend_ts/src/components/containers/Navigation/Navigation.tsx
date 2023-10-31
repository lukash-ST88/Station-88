import {Link} from 'react-router-dom'
import { connect} from "react-redux";  
import "./Navigation.css"


interface IIsAuhtenticated {
    isAuthenticated: boolean
}

interface IAuthProps {
    auth:  IIsAuhtenticated
}

function Navigation(props: IAuthProps){
    return (
        <nav>
            <div className='flex flex-wrap justify-between items-center md:flex-nowrap md:gap-10'>
                <Link to='#' className='img-links'><img className='logo' src='/images/Durica.jpg'></img></Link>
                <Link to='/articles' className='nav-links'>Статьи</Link>
                <Link to='/movies' className='nav-links'>Фильмы</Link>
                <Link to='/' className='station88'> STATION 88 </Link>
                <Link to='#' className='nav-links'>Образование</Link>
                <Link to='/projects' className='nav-links'>Проекты</Link>
                <div className='nav-links'>{props.auth.isAuthenticated ? <div>image</div> : <Link to='/login'>Профиль</Link> } </div>
            </div>
        </nav>
    )
}
const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth
  });


export default connect(mapStateToProps)(Navigation);  
