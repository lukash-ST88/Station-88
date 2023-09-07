import React from 'react'
import {Link} from 'react-router-dom'


function Navigation(){
    return (
        <nav>
            <div className='flex flex-wrap justify-between items-center md:flex-nowrap md:gap-10'>
                <Link to='#' className='nav-links'>О нас</Link>
                <Link to='/articles' className='nav-links'>Статьи</Link>
                <Link to='/movies' className='nav-links'>Фильмы</Link>
                <Link to='/' className='station88'> STATION 88 </Link>
                <Link to='#' className='nav-links'>Образование</Link>
                <Link to='#' className='nav-links'>Проекты</Link>
                <Link to='#' className='nav-links'>Профиль</Link>
            </div>
        </nav>
    )
}

export default Navigation