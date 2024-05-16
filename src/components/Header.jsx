import { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NoteContext } from '../context/NoteContext';
import './Header.css'; // Import the CSS file for additional styles

function Header() {
  const { darkMode, toggleDarkMode } = useContext(NoteContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-4 w-100">
      <Container>
        <Navbar.Brand href="/">Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-lg-between align-items-lg-center">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add Note</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-lg-auto">
            <Button 
              variant="secondary" 
              className={`dark-mode-toggle`} 
              onClick={toggleDarkMode}
            >
              {darkMode ? <img src='/sun.png' alt="Light Mode" /> : <img src='/moon.png' alt="Dark Mode" />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
