import React from 'react'
import {Link} from 'react-router-dom'


function Navigation(){
    return (
        <nav>
            <div className='flex flex-wrap justify-between md:flex-nowrap md:gap-10'>
                <a href='#' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>О нас</a>
                <Link to='/articles' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>Статьи</Link>
                <Link to='/movies' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>Фильмы</Link>
                <Link to='/' className='text-white hover:text-red-500'> СТАНЦИЯ 88 </Link>
                <a href='#' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>Образование</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>Проекты</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-green-500 hover:text-red-500 dark:text-gray-400'>Профиль</a>
            </div>
        </nav>
    )
}

export default Navigation