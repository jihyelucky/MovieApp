import Header from "../components/Header";
import Slide from "../components/Slide";
import styles02 from "./Home.module.css";

function Home() {
  const Group_obj = {
    "High Rating": "minimum_rating=8",
    Romance: "genre=romance",
    Comedy: "genre=comedy",
    Animation: "genre=animation",
    Thriller: "genre=thriller",
  };
  const Group_key_arr = Object.keys(Group_obj);

  return (
    <div className={styles02.wrap}>
      <div className={styles02.BgItem}></div>
      <div>
        <Header />
        {Group_key_arr.map((group, i) => (
          <div className={styles02.inner} key={i}>
            <h1 className={styles02.top_rank}>{Group_key_arr[i]}</h1>
            <Slide
              ytsApi={`https://yts.mx/api/v2/list_movies.json?limit=10&${Group_obj[group]}&sort_by=rating`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
