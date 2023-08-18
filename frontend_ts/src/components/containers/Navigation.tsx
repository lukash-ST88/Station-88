import React from 'react'



function Navigation(){
    return (
        <nav>
            <div className='flex flex-wrap justify-between md:flex-nowrap md:gap-10'>
                <a href='#' className='px-5 py-2 text-sm font-medium text-white hover:text-green-500 dark:text-gray-400'>О нас</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400'>Статьи</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400'>Фильмы</a>
                <a href='/' className='text-white'> СТАНЦИЯ 88 </a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400'>Образование</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400'>Проекты</a>
                <a href='#' className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400'>Профиль</a>
            </div>
        </nav>
    )
}

export default Navigation