import Header from "../components/Header";
import Slide from "../components/Slide";
import SearchRoute from "./SearchRoute";
import styles02 from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Group_obj, Group_key_arr } from "../components/Type";
function Home() {
  const [moiveSearh, setMoiveSearh] = useState("");
  const OnMoiveSearh = (event) => {
    setMoiveSearh(event.target.value);
  };
  const Delete = () => {
    setMoiveSearh("");
  };

  return (
    <div className={styles02.wrap}>
      <div>
        <Header />
        <Form className={styles02.search}>
          <div className={styles02.input_box}>
            <Form.Control
              placeholder="Search The Title Or Summary"
              className="me-2"
              aria-label="Search"
              value={moiveSearh}
              onChange={OnMoiveSearh}
            />
            {moiveSearh ? (
              <FontAwesomeIcon
                icon={faXmark}
                className={styles02.input_box_close}
                onClick={Delete}
              />
            ) : null}
          </div>
        </Form>
        {moiveSearh ? (
          <SearchRoute moiveSearh={moiveSearh}></SearchRoute>
        ) : (
          Group_key_arr.map((group, i) => (
            <div className={styles02.inner} key={i}>
              <h1 className={styles02.top_rank}>{Group_key_arr[i]}</h1>
              <Slide
                ytsApi={`https://yts.mx/api/v2/list_movies.json?limit=10&${Group_obj[group]}&sort_by=rating`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
