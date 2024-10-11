import css from "./ImageCard.module.css";

export default function ImageCard({ image}) {
    return(
        <div className={css.image__box}>
            <img className={css.image}  src={image.urls.small} alt={image.alt_description} />
        </div>
    )
};
