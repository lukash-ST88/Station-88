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
 
  const navList = (
    <ul className="mt-2 mb-0 flex flex-col lg:flex-row lg:items-center lg:gap-10">
            { !openNav && <Link to='#'><img className='img-links' src='/images/Durica_v2.jpg' alt='station88-logo'/></Link>}
            { openNav && <Link to='/' className='nav-links'> Главная </Link>}
            <Link to='/articles' className='nav-links'>Статьи</Link>
            <Link to='/movies' className='nav-links'>Фильмы</Link>
            {!openNav && <Link to='/' className='station88'> STATION 88 </Link>}
            <Link to='#' className='nav-links'>Образование</Link>
            <Link to='/projects' className='nav-links'>Проекты</Link>
            {props.auth.isAuthenticated 
                ? <Link to={`/profile/${props.auth.user.username}`} className='nav-links'>{props.auth.user.username}</Link>
                : <div className='nav-links'><ModalFR/></div>
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
