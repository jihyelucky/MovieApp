import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Loading.module.css";
import styles02 from "./Detail.module.css";
import Header from "../components/Header";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
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
        <div className={styles.loading}>
          <div className={styles.load}>
            <p>Loading</p>
            <div class="square-holder">
              <div className={styles.square}></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <div className={styles02.bgItem}>
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
                <p>runtime {movies.runtime}</p>
                <ul>
                  {genres.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <p>{movies.description_full}</p>
                <p>rating: {movies.rating}</p>
                <p>like: {movies.like_count}</p>
                <p>download: {movies.download_count}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
