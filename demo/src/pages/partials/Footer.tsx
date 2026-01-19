import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../assets/style/Footer.scss";

const Footer = () => {
  return (
    <footer className="demo-footer">
      <Container>
        <Row className="gy-4">
          <Col md={6}>
            <h5>🎬 City & Movie Demo</h5>
            <p>
              Ett demo-projekt där städer möter filmvärlden.  
              Utforska platser, redigera data och se hur API:er kan
              användas i praktiken.
            </p>
          </Col>

          <Col md={6}>
            <h5>🌍 Visste du att?</h5>
            <ul>
              <li>New York är den mest filmade staden i världen</li>
              <li>Paris förekommer i över 3000 filmer</li>
              <li>Små städer blir ofta filmkulisser i stora produktioner</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
