import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Load from "../components/Load";
import Movie from "../components/Movie";
import styles from "./Search.module.css";
import { Group_key_arr, Group_object_arr } from "../components/Type";

const ListArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Group() {
  const { group, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?${group}&page=${page}&sort_by=rating`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
    // console.log(json);
  };

  useEffect(() => {
    getMovies();
    setLoading(true);
    return;
  }, [group, page]);

  let title;
  for (let i = 0; i < Group_object_arr.length; i++) {
    if (group === Group_object_arr[i]) {
      title = Group_key_arr[i];
    }
  }

  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <div>
          <Header />
          <div className={styles.SearchRoute}>
            <h1 className={styles.SearchTitle}>{title}</h1>
            <ul className={styles.SearchList}>
              {movies.map((movie) => {
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
        </div>
      )}
      {loading ? null : (
        <div className={styles.pagination}>
          {ListArray.map((list) => {
            return (
              <Link key={list} to={`/page/${group}/${list}`}>
                {list}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Group;
