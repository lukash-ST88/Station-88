import {Link} from 'react-router-dom'
import { connect} from "react-redux";  
import "./Navigation.css"
import { ModalFR } from '../../components/Modal/Modal'
import {
  MobileNav,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { ClosingCross, NavbarToggle } from '../../utils/svgImages';
 
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
    <ul className="mt-2 mb-0 flex flex-col lg:grid lg:grid-cols-7 lg:items-center lg:gap-8 lg:mx-5 lg:justify-center">
            {/* <Link to='#' className='hidden lg:block'><img className='img-links' src='/images/Durica_v2.jpg' alt='station88-logo'/></Link> */}
            <Link to='/about' className='hidden lg:flex flex-col justify-center items-center'>
              <img className='w-[80px] h-auto border-b-2 pb-1 hover:border-st88-main border-white' src='/images/Durica_v4.png' alt='station88-logo'/>
              {/* <div className='lg:absolute'> О нас </div> */}
            </Link>
            <Link to='/' className='nav-links block lg:hidden' onClick={closeMobileNav}> Главная </Link>
            <Link to='/articles' className='nav-links' onClick={closeMobileNav}>Статьи</Link>
            <Link to='/movies' className='nav-links'onClick={closeMobileNav}>Фильмы</Link>
            <Link to='/' className='station88 hidden lg:block'> STATION 88 </Link>
            <Link to='/blog' className='nav-links' onClick={closeMobileNav}>Блог</Link>
            <Link to='/projects' className='nav-links' onClick={closeMobileNav}>Проекты</Link>
            <Link to='/about' className='nav-links block lg:hidden' onClick={closeMobileNav}> О нас </Link>
            {props.auth.isAuthenticated 
                ? <Link to={`/profile/${props.auth.user.username}`} className='nav-links' onClick={closeMobileNav}>{props.auth.user.username}</Link>
                : <div className='nav-links' onClick={closeMobileNav}><ModalFR/></div>
            }
    </ul>
  );
 
  return (
    <nav>
      <div className="flex flex-wrap justify-around items-center md:flex-nowrap">
       <Link to='/' className='lg:hidden station88 ml-5'> STATION 88 </Link>
        <div className="hidden lg:block">{navList}</div>
        <IconButton variant="text" className="ml-auto h-6 w-6 mr-5 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
          {openNav ? <ClosingCross/> : <NavbarToggle/>}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </MobileNav>
    </nav>
  );
}

const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(NavbarDefault);

// <Link to='/login' className='nav-links'>Профиль</Link> 

// TODO: - delete packages bootstrap and reactstrap
