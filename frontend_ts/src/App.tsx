import Footer from "./components/containers/Footer/Footer";
import Navigation from "./components/containers/Navigation/Navigation";
import SliderContainer from "./components/containers/Slider/SliderContainer";
import Router from "./routers/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <div className="App container color-theme mx-auto my-0 min-h-screen flex flex-col justify-between lg:justify-start">
      <div className="container lg:py-4 mx-auto">
        <Navigation />
      </div>
      <hr className="mx-5 mb-3 lg:block hidden"/>
      <div className="container px-5 mx-auto xl:block hidden">
        <SliderContainer />
      </div>
      <hr className="mx-5 mt-3 hidden lg:block"/>
      <div className="container px-5 mx-auto lg:pt-8 pt-[70px]">
        <Router />
      </div>
      <div className="container px-5 mx-auto xl:px-5 py-5 lg:py-8 mt-10 border-t border-gray-100">
        <Footer/> 
      </div>
    </div>
    <ToastContainer hideProgressBar={true} newestOnTop={true} position="top-center" theme="dark"/>
    </>
  );
}

export default App;
