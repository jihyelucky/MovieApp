import { useEffect, useRef, useState } from "react";
import Load from "./Load";
import Movie from "./Movie";
import style from "./Movie.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

// swiepr
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

function Slide({ ytsApi }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

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
        <Load />
      ) : (
        <div>
          <Swiper
            grabCursor={true}
            spaceBetween={20}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                width: 320,
                slidesPerView: 1.3,
                spaceBetween: 10,
                centeredSlides: true,
              },
              480: {
                width: 480,
                slidesPerView: 2.2,
                centeredSlides: false,
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
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
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
            <div ref={navigationPrevRef} className={style.prev}>
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </div>
            <div ref={navigationNextRef} className={style.next}>
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Slide;
