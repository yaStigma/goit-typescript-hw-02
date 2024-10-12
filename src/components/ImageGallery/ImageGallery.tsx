import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../../type";

interface ImageGalleryProps {
    images: Image[];
    onImageClick: (image: Image) => void; 
  }
  
  const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
    console.log(images);
    return (
      <ul className={css.list}>
        {images.map((image) => (
          <li key={image.id} className={css.list__item} onClick={() => onImageClick(image)}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    );
  };
  
  export default ImageGallery;