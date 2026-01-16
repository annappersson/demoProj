// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { useAuth } from "../../hooks/useAuth";
// import "../../assets/style/Navigation.scss";

// function Navigation() {
//     const { isAuthenticated, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         toast.success("Du är utloggad");
//         navigate("/", { replace: true });
//     };

//     return (
//         <Navbar expand="lg" bg="light">
//             <Container>
//                 <Navbar.Brand onClick={() => navigate("/")}>DEMO</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />

//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         {isAuthenticated && (
//                             <Nav.Link onClick={() => navigate("/dashboard")}>
//                                 Cities
//                             </Nav.Link>
//                         )}

//                         <Nav.Link onClick={() => navigate("/contact")}>
//                             Kontakt
//                         </Nav.Link>

//                         {isAuthenticated && (
//                             <NavDropdown title="Profil" id="basic-nav-dropdown">
//                                 <NavDropdown.Item onClick={() => navigate("/profile")}>
//                                     Redigera profil
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item onClick={handleLogout}>
//                                     Logga ut
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Navigation;
