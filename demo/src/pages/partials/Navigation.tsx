import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import "../../assets/style/Navigation.scss";
import { useAuth } from "../../hooks/useAuth";

function Navigation() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="dark" className="demo-navbar" sticky="top">
      <Container>
        <Navbar.Brand className="demo-brand" onClick={() => navigate("/")}>
          📍 DEMO
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link onClick={() => navigate("/cities")}>Cities</Nav.Link>

            <Nav.Link onClick={() => navigate("/contact")}>Kontakt</Nav.Link>

            <NavDropdown title="Profil" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item onClick={() => navigate("/myPage")}>
                Redigera profil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logga ut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
