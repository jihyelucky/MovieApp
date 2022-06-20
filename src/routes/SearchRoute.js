import styles from "./Search.module.css";
import Movie from "../components/Movie";
import { useEffect, useState } from "react";

function SearchRoute({ moiveSearh }) {
  const [movies, setMovies] = useState([]);
  const [movArr, setMovArr] = useState([]);

  const getMovies = () => {
    for (let i = 1; i <= 200; i++) {
      setMovies([]);
      fetch(`https://yts.mx/api/v2/list_movies.json?page=${i}&sort_by=rating`)
        .then((res) => res.json())
        .then((json) => setMovies(json.data.movies))
    }
  }

  useEffect(() => {
    setMovArr([]);
    getMovies();
    return;
  }, [moiveSearh])


  useEffect(() => {
    setMovArr(
      (
        [movArr,
          ...[movies.filter((movie) => (movie.summary.toLowerCase().indexOf(moiveSearh.toLowerCase()) !== -1
            || movie.title.toLowerCase().indexOf(moiveSearh.toLowerCase()) !== -1))]
        ]
      )
        .flat()
        .map((movie, i, arr) => {
          for (let j = i + 1; j < arr.length; j++) {
            if ((movie.id === arr[j].id) && arr[j] !== undefined && movie !== undefined) {
              // console.log(i, j);
              // console.log(movie.id, arr[j].id);
              arr.splice(j, 1);
              j -= 1;
            }
          }
          return movie;
        })
        .sort((a, b) => b['rating'] - a['rating'])
    );
  }, [movies]);

  return (
    <div className={styles.SearchRoute}>
      <ul className={styles.SearchList}>
        {movArr.map((movie) => {
          return (
            <li>
              <Movie
                key={movie.id}
                id={movie.id}
                coverImage={movie.medium_cover_image}
                genres={movie.genres}
                summary={movie.summary}
                title={movie.title}
                year={movie.year}
                smallImage={movie.small_cover_image}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SearchRoute;
