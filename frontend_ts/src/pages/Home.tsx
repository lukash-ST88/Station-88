import { connect } from "react-redux";
import IntroductionDivision from "../components/divisions/home/introductionDivision";
import EmailDivision from "../components/divisions/home/emailDivision";
import TwoSidesSliderDivision from "../components/divisions/home/twoSidesSilderDivision";
import { mainDescription } from "../utils/metaContent";


const Home = () =>{
    return(
        <>
          <title> Станция 88 </title> 
          <meta name="description" content={mainDescription}/>

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
