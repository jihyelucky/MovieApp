import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles02 from "./Detail.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Load from "../components/Load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setGenres(json.data.movie.genres);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <div>
          <Header />
          <div className={styles02.bgItem}>
            <div className={styles02.back}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={() => navigate(-1)}
              />
            </div>
            <img
              src={movies.background_image}
              alt={movies.title}
              className={styles02.bgItemImg}
            />
            <div className={styles02.bgCont}>
              <div className={styles02.moviePhoto}>
                <h1>{movies.title_long}</h1>
                <img src={movies.large_cover_image} alt={movies.title} />
              </div>
              <div className={styles02.movieCont}>
                <p>
                  ⭐{movies.rating} &nbsp;&nbsp;&nbsp;&nbsp; ❤️
                  {movies.like_count}
                </p>
                <p>🎬 {movies.runtime} Minutes</p>
                <ul className={styles02.movieList}>
                  {genres.map((g) => (
                    <li key={g}>🔸{g}</li>
                  ))}
                </ul>
                <p className={styles02.content}>{movies.description_full}</p>

                <p>⬇️ {movies.download_count}</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
export default Detail;
