import { ModalRS } from "./components/components/Modal/Modal";
import Footer from "./components/containers/Footer/Footer";
import Navigation from "./components/containers/Navigation/Navigation";
import SliderContainer from "./components/containers/Slider/SliderContainer";
import Router from "./routers/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <div className="App container color-theme mx-auto my-0">
      <div className="container py-5 mx-auto ">
        <Navigation />
      </div>
      <div className="container px-5 mx-auto ">
        <SliderContainer />
      </div>
      <div className="container px-5 mx-auto xl:px-5 py-5 lg:py-8 ">
        <Router />
      </div>
      <div className="container px-5 mx-auto xl:px-5 py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800">
        <Footer/> 
      </div>
    </div>
    <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </>
  );
}

export default App;
