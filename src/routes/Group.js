import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";

const List_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Group() {
  const { group, page } = useParams();
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?page=${page}&${group}&sort_by=rating`
      )
    ).json();
    setMovies(json.data.movies);
  };
  useEffect(() => {
    getMovies();
    return;
  }, [group, page]);

  return (
    <div>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          coverImg={movie.medium_cover_image}
          rating={movie.rating}
          runtime={movie.runtime}
          summary={movie.summary}
          year={movie.year}
        />
      ))}
      {List_arr.map((lst) => {
        return (
          <Link key={lst} to={`/page/${group}/${lst}`}>
            {lst}
          </Link>
        );
      })}
    </div>
  );
}
export default Group;
