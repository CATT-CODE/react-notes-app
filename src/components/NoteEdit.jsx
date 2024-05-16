import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button } from 'react-bootstrap';

function NoteEdit() {
  const { id } = useParams();
  const { notes, deleteNote, updateNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const note = notes.find(note => note.id === Number(id));

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTitle = e.target.elements.noteTitle.value;
    const updatedText = e.target.elements.noteText.value;
    const updatedColor = e.target.elements.noteColor.value;

    updateNote({
      ...note,
      title: updatedTitle,
      text: updatedText,
      color: updatedColor
    });

    navigate('/');
  };

  return (
    <>
      <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={note.title}
            name="noteTitle"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Note Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={note.text}
            name="noteText"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Note Color</Form.Label>
          <Form.Control
            as="select"
            defaultValue={note.color}
            name="noteColor"
          >
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="orange">Orange</option>
            <option value="blue">Blue</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mr-2">Save</Button>
        <Button
          variant="danger"
          className="mt-3 ml-2"
          onClick={() => {
            deleteNote(note.id);
            navigate('/');
          }}
        >
          Delete
        </Button>
      </Form>
    </>
  );
}

export default NoteEdit;
