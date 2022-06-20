import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Header.css";
import { Group_obj, Group_key_arr } from "./Type";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <a href={`${process.env.PUBLIC_URL}/`}>JHFLIX</a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {Group_key_arr.map((key) => {
              return (
                <div key={key}>
                  <Nav.Link>
                    <Link to={`/page/${Group_obj[key]}/1`}>{key}</Link>
                  </Nav.Link>
                </div>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
