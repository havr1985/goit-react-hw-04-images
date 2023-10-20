import Modal from "react-modal";
import { Img } from "./GalleryItem.styled";
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },

overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1200,
  },
};

Modal.setAppElement('#root');
export const ImageGalleryItem = ({addImages: { webformatURL, largeImageURL, tags }}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

      return (
        <>
        <div onClick={openModal}>
            <Img src={webformatURL} alt={tags} />   
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={largeImageURL} alt={tags}/>
        </Modal>
         </>
    );
  }

