import { Modal} from "flowbite-react";
import { useState } from "react";
import LoginTag from "../../auth/Login/LoginTag";
import SignupTag from "../../auth/Signup/SignupTag";
import { FaUserAlt } from "react-icons/fa";

export const ModalFR = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLogedIn, setIsLogedIn ] = useState<boolean>(true)

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 justify-center">Профиль<FaUserAlt className='lg:hidden block w-5 h-5'/></button>
 
      <Modal show={openModal} size="md" onClose={onCloseModal} popup className="fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full lg:window-size bg-opacity-50">
        <Modal.Body>
          <div className="space-y-6">
            {isLogedIn ? <LoginTag /> : <SignupTag/>}
            {isLogedIn 
            ? <button onClick={() => setIsLogedIn(!isLogedIn)} className="text-red-500 bg-white border border-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Регистрация</button> 
            : <button onClick={() => setIsLogedIn(!isLogedIn)} className="text-green-500 bg-white border border-green-500 hover:bg-green-500 hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Вход</button> 
            }
          <button className="text-gray-500 bg-white border border-gray-500 hover:bg-gray-500 hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center" onClick={() => onCloseModal()}> 
          Закрыть
          </button>
          </div>
        </Modal.Body>
     
      </Modal>
     
    </>
  );
};
