import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button } from 'react-bootstrap';

function NoteAdd() {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const { addNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      addNote({
        id: Date.now(),
        text: noteText,
        title: noteTitle
      });
      setNoteText('');
      setNoteTitle('');
      navigate('/');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            as="input"
            rows={1}
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <br />
          <Form.Label>Note Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Add Note</Button>
      </Form>
    </>
  );
}

export default NoteAdd
