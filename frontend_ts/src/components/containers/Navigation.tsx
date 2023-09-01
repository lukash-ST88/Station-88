import React from 'react'
import {Link} from 'react-router-dom'


function Navigation(){
    return (
        <nav>
            <div className='flex flex-wrap justify-between md:flex-nowrap md:gap-10'>
                <a href='#' className='nav-links'>О нас</a>
                <Link to='/articles' className='nav-links'>Статьи</Link>
                <Link to='/movies' className='nav-links'>Фильмы</Link>
                <Link to='/' className='station88'> STATION 88 </Link>
                <a href='#' className='nav-links'>Образование</a>
                <a href='#' className='nav-links'>Проекты</a>
                <a href='#' className='nav-links'>Профиль</a>
            </div>
        </nav>
    )
}

export default Navigation