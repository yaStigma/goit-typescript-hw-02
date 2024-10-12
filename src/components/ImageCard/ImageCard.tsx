import { Image } from "../../type";
import css from "./ImageCard.module.css";

interface ImageCardProps {
    image: Image;
}
const ImageCard: React.FC<ImageCardProps> = ({image}) => {
    return(
        <div className={css.image__box}>
            <img className={css.image}  src={image.urls.small} alt={image.alt_description} />
        </div>
    )
};
export default  ImageCard