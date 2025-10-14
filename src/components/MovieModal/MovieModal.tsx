import css from "./MovieModal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
   movie: Movie ;
     onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {


  useEffect(() => {
      

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(); 
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow || "";
    };
  }, [ onClose]);
  
  

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const imageSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
    
    
return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

         {imageSrc ? (
          <img src={imageSrc} alt={movie.title || "Movie image"} className={css.image} loading="lazy" />
        ) : (
          <div className={css.placeholder}>No image available</div>
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date: </strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating: </strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

