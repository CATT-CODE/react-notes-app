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
    const updatedText = e.target.elements.noteText.value;
    updateNote({
      ...note,
      text: updatedText
    });
    navigate('/');
  };

  return (
    <>
      <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Form.Label>Note Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={note.text}
            name="noteText"
          />
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

export default NoteEdit