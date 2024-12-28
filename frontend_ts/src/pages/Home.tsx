import { connect } from "react-redux";
import IntroductionDivision from "../components/divisions/home/introductionDivision";
import EmailDivision from "../components/divisions/home/emailDivision";
import TwoSidesSliderDivision from "../components/divisions/home/twoSidesSilderDivision";


const Home = () =>{
    return(
        <>
          <IntroductionDivision/>
          <TwoSidesSliderDivision/>
          <EmailDivision/>
        </>
    )
};

const mapStateToProps = (state: any) => ({
    auth: state.auth,
  });

  export default connect(mapStateToProps)(Home);
