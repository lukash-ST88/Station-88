import {Link} from 'react-router-dom'
import { connect} from "react-redux";  
import "./Navigation.css"
import { ModalFR } from '../../components/Modal/Modal'
import {
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { ClosingCross, NavbarToggle } from '../../utils/svgImages';
import { RiArticleFill } from "react-icons/ri"; 
import { RiMovie2Fill } from "react-icons/ri";
import { MdMovie } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { GiBeveledStar } from "react-icons/gi";

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

function NavbarDefault(props: IAuthProps) {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  
  function closeMobileNav() {
    if (openNav) {
      setOpenNav(false);
    }
  };

  const navList = (
    <ul className="mt-2 mb-0 flex flex-col items-end lg:grid lg:grid-cols-7 lg:items-center lg:gap-8 lg:mx-5 lg:justify-center lg:text-2xl">
            <Link to='/about' className='hidden lg:flex flex-col justify-center items-center'>
              <img className='w-[80px] h-auto border-b-2 pb-1 hover:border-st88-main border-white' src='/images/Durica_v4.png' alt='station88-logo'/>
            </Link>
            <Link to='/' className='nav-links lg:hidden flex items-center gap-2 justify-center' onClick={closeMobileNav}> Главная <GiBeveledStar className='lg:hidden block w-5 h-5'/></Link>
            <Link to='/articles' className='nav-links flex items-center gap-2 justify-center' onClick={closeMobileNav}>Статьи <RiArticleFill className='lg:hidden block w-5 h-5'/></Link>
            <Link to='/movies' className='nav-links flex items-center gap-2 justify-center' onClick={closeMobileNav}>Фильмы <RiMovie2Fill className='lg:hidden block w-5 h-5'/></Link>
            <Link to='/' className='station88 hidden lg:inline-block'> STATION 88 </Link>
            <Link to='/blog' className='nav-links flex items-center gap-2 justify-center' onClick={closeMobileNav}>Блог <FaThList className='lg:hidden block w-5 h-5'/></Link>
            <Link to='/projects' className='nav-links flex items-center gap-2 justify-center' onClick={closeMobileNav}>Проекты <MdMovie className='lg:hidden block w-5 h-5'/></Link>
            <Link to='/about' className='nav-links lg:hidden flex items-center gap-2 justify-center' onClick={closeMobileNav}> О нас <FaUsersBetweenLines className='lg:hidden block w-5 h-5'/></Link>
            {props.auth.isAuthenticated 
                ? <Link to={`/profile/${props.auth.user?.username}`} className='nav-links flex items-center gap-2 justify-center' onClick={closeMobileNav}><div className={props.auth.user?.username?.length > 12 ? 'lg:text-sm' : ''}>{props.auth.user?.username}</div><FaUserAlt className='lg:hidden block w-5 h-5'/></Link>
                : <div className='nav-links' onClick={closeMobileNav}><ModalFR/></div>
            }
    </ul>
  );
 
  return (
    <nav>
      <div className="flex flex-wrap justify-between items-center md:flex-nowrap lg:static fixed container w-[100vw] bg-st88-background lg:h-auto h-[60px] border-b-2 px-2 lg:border-b-0" style={{zIndex: 100}}>
        <Link to='/' className='lg:hidden station88'> STATION 88 </Link>
        <div className="hidden lg:block">{navList}</div>
        <IconButton variant="text" className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
          {openNav ? <ClosingCross/> : <NavbarToggle/>}
        </IconButton>
      </div>
      <Collapse open={openNav} className='fixed bg-st88-background lg:static mt-[60px] border-b-2 container lg:border-b-0 lg:mt-0' style={{zIndex: 100}}>
        <div className="container mx-auto grid grid-cols-8 items-end justify-start">
          <div className='col-span-5'>
            <img className='max-h-[220px] hover:border-st88-main border-white' src='/images/Durica_v4.png' alt='station88-logo'/>
          </div>
          <div className='col-span-3'>
            {navList}
          </div>
        </div>
      </Collapse>
    </nav>
  );
}

const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(NavbarDefault);

// <Link to='/login' className='nav-links'>Профиль</Link> 

// TODO: - delete packages bootstrap and reactstrap
