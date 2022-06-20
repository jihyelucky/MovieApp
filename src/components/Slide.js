import { useEffect, useState } from "react";
import styles from "../routes/Loading.module.css";
import Movie from "./Movie";

// swiepr
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function Slide({ ytsApi }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (await fetch(ytsApi)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
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
          <Swiper
            grabCursor={true}
            spaceBetween={20}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              320: {
                width: 320,
                slidesPerView: 1.2,
              },
              480: {
                width: 480,
                slidesPerView: 2.2,
              },
              768: {
                width: 768,
                slidesPerView: 3.2,
              },
              1023: {
                width: 1023,
                slidesPerView: 4.2,
              },
              1440: {
                width: 1440,
                slidesPerView: 5.2,
              },
            }}
          >
            {movies.map((movie) => {
              return (
                <SwiperSlide>
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Slide;
