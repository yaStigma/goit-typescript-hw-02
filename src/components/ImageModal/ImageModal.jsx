import Modal from 'react-modal';
import css from "./ImageModal.module.css"


Modal.setAppElement('#root');


export default function ImageModal({ isOpen, onRequestClose, image }) {
    
    if (!image) return null;

    return(
        <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onRequestClose} className={css.closeButton}>X</button>
      <img src={image.urls.regular} alt={image.alt_description} className={css.modalImage} />
      <div>
      <p className={css.text}> {image.description} </p>
      <p className={css.text}>likes: {image.likes} </p>
      <p className={css.text}>location: {image.user.location}</p>
      <p className={css.text}>photographer: {image.user.name}</p>
      </div>
    </Modal>
    )
};
