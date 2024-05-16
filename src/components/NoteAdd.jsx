import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button } from 'react-bootstrap';

const NoteAdd = () => {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteColor, setNoteColor] = useState('yellow');
  const { addNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteTitle.trim() && noteText.trim()) {
      addNote({
        id: Date.now(),
        title: noteTitle,
        text: noteText,
        color: noteColor,
      });
      setNoteTitle('');
      setNoteText('');
      navigate('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Note Title</Form.Label>
        <Form.Control
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Note Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Note Color</Form.Label>
        <Form.Control
          as="select"
          value={noteColor}
          onChange={(e) => setNoteColor(e.target.value)}
        >
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">Add Note</Button>
    </Form>
  );
};

export default NoteAdd;
