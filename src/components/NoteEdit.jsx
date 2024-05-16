import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button, Container } from 'react-bootstrap';
import ColorFilterDropdown from './ColorFilterDropdown';
import './NoteEditAdd.css';

function NoteEdit() {
  const { id } = useParams();
  const { notes, updateNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const currentNote = notes.find(note => note.id === Number(id));
    if (currentNote) {
      setNote(currentNote);
    }
  }, [id, notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedNote = { ...note, [name]: value };
    setNote(updatedNote);
    updateNote(updatedNote);
  };

  const handleColorChange = (color) => {
    if (color === '') {
      color = 'yellow'
    }
    const updatedNote = { ...note, color: color };
    setNote(updatedNote);
    updateNote(updatedNote);
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={`sticky-note-container ${note.color}`}>
      <Form>
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
        <Button variant="danger" onClick={() => { navigate('/') }} className="mt-3">Back</Button>
      </Form>
    </Container>
  );
}

export default NoteEdit;
