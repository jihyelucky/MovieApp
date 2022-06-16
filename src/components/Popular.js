import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./Movie.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Popular({ id, coverImage, title, summary, genres, year }) {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };
  return (
    <div className={style.slide_box}>
      <div onClick={showModal} className={style.movies}>
        <img src={coverImage} alt={title} className={style.titleImg} />
        <h2 className={style.title}>{title}</h2>
        <h5 className={style.year}>{year}</h5>
      </div>
      {modal ? (
        <div className={style.hide_box}>
          <button className={style.close} onClick={hideModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img src={coverImage} alt={title} className={style.titleImg} />
          <p className={style.summary}>
            {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
          </p>
          <ul className={style.genres}>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>
            <button className={style.view}>View More</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

Popular.propTypes = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Popular;
