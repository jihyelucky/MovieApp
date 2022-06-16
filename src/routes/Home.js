import { useEffect, useRef, useState } from "react";
import Movie from "../components/Movie";
import Header from "../components/Header";
import Best from "../components/Popular";
import styles from "./Loading.module.css";
import styles02 from "./Home.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  SwiperCore.use([Navigation]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setPopularMovies(json.data.movies);
    // setPopularMovies.sort();
    setLoading(false);
  };
  useEffect(() => {
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
          <Header />
          <div className={styles02.inner}>
            <h1 className={styles02.top_rank}>Popular</h1>
            <Swiper
              grabCursor={true}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              spaceBetween={20}
              modules={[Navigation]}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
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
              {PopularMovies.map((movie) => (
                <SwiperSlide>
                  <Best
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    coverImage={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                  />
                </SwiperSlide>
              ))}
              <div ref={navigationPrevRef} />
              <div ref={navigationNextRef} />
            </Swiper>
          </div>
          <div className={styles02.inner}>
            <h1 className={styles02.top_rank}>Top Rank</h1>
            <Swiper
              grabCursor={true}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              spaceBetween={20}
              modules={[Navigation]}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
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
              {movies.map((movie) => (
                <SwiperSlide>
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    coverImage={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                  />
                </SwiperSlide>
              ))}
              <div ref={navigationPrevRef} />
              <div ref={navigationNextRef} />
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
