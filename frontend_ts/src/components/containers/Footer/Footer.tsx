import { connect} from "react-redux"; 
import {NavLink} from 'react-router-dom'
import { ModalFR } from '../../components/Modal/Modal'
import { FaUserAlt } from "react-icons/fa";

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

const Footer = (props: IAuthProps) => {
  return (
    <footer className="flex flex-row justify-center items-center lg:text-base md:text-sm text-xs text-center gap-3">
      <div className="mx-2 hover:text-st88-main">
        {props.auth.isAuthenticated 
            ? <NavLink to={`/profile/${props.auth.user?.username}`}>{props.auth.user?.username}</NavLink>
            : <ModalFR/>
        }
      </div>
      <div className="mx-2">Developed by Lukash Andrei</div>
      <div  className="mx-2">&copy; 2023-2025</div>
    </footer>
  );
};

const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(Footer);