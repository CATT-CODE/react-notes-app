import { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NoteContext } from '../context/NoteContext';

function Header() {
  const { darkMode, toggleDarkMode } = useContext(NoteContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-4 w-100">
      <Container>
        <Navbar.Brand href="/">Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add Note</Nav.Link>
            </LinkContainer>
          </Nav>
          <Button variant="secondary" onClick={toggleDarkMode}>
            {darkMode ? <img src='/sun.png' /> : <img src='/moon.png' />}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header