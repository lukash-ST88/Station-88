import {Link} from 'react-router-dom'
import { connect} from "react-redux";  


function Navigation(props: any){
    return (
        <nav>
            <div className='flex flex-wrap justify-between items-center md:flex-nowrap md:gap-10'>
                <Link to='#' className='nav-links'>О нас</Link>
                <Link to='/articles' className='nav-links'>Статьи</Link>
                <Link to='/movies' className='nav-links'>Фильмы</Link>
                <Link to='/' className='station88'> STATION 88 </Link>
                <Link to='#' className='nav-links'>Образование</Link>
                <Link to='#' className='nav-links'>Проекты</Link>
                <div className='nav-links'>{props.auth.isAuthenticated ? <div>image</div> : <Link to='/login'>Профиль</Link> } </div>
            </div>
        </nav>
    )
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
  });


export default connect(mapStateToProps)(Navigation);  