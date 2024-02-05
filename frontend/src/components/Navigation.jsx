import { Container, Navbar } from 'react-bootstrap';
import routes from '../routes.js';

const NavigationBar = () => (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href={routes.mainPath()}>Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavigationBar;
