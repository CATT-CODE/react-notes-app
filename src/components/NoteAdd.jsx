import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button, Container } from 'react-bootstrap';
import ColorFilterDropdown from './ColorFilterDropdown';
import './NoteEditAdd.css';

function NoteAdd() {
  const { addNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    text: '',
    color: 'green'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const handleColorChange = (color) => {
    if (color === '') {
      color = 'yellow'
    }
    setNote({
      ...note,
      color: color
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      ...note,
      id: Date.now()
    });
    navigate('/');
  };

  return (
    <Container className={`sticky-note-container ${note.color}`}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            value={note.title}
            name="title"
            onChange={handleChange}
            className="sticky-note-title"
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write your note here..."
            value={note.text}
            name="text"
            onChange={handleChange}
            className="sticky-note-text"
          />
        </Form.Group>
        <ColorFilterDropdown selectedColor={note.color} onSelectColor={handleColorChange} />
        <Button variant="primary" type="submit" className="mt-3 me-2">Save</Button>
        <Button variant="danger" onClick={() => { navigate('/') }} className="mt-3">Back</Button>
      </Form>
    </Container>
  );
}

export default NoteAdd;
