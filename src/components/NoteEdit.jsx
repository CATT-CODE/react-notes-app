import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import ColorFilterDropdown from './ColorFilterDropdown';
import './NoteEditAdd.css';
import { summarizeText } from '../utils/api';

function NoteEdit() {
  const { id } = useParams();
  const { notes, updateNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [originalText, setOriginalText] = useState('');
  const [loading, setLoading] = useState(false);

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
    const updatedNote = { ...note, color: color };
    setNote(updatedNote);
    updateNote(updatedNote);
  };

  const summarizeNote = async () => {
    setLoading(true);
    try {
      const summary = await summarizeText(note.title + " " + note.text);
      setOriginalText(note.text);
      setNote({
        ...note,
        text: summary
      });
      updateNote({
        ...note,
        text: summary
      });
    } catch (error) {
      console.error('Error summarizing note:', error);
    } finally {
      setLoading(false);
    }
  };

  const undoChanges = () => {
    setNote({
      ...note,
      text: originalText
    });
    updateNote({
      ...note,
      text: originalText
    });
    setOriginalText('')
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
        <div className="d-flex justify-content-between mt-3">
          <Button variant="danger" onClick={() => navigate('/')}>Back</Button>
          <div>
            {!originalText ?
              <Button variant="primary" onClick={summarizeNote} disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <><img style={{height: '16px'}} src='/sparkle.png' /> <span>Summarize</span></>}
              </Button>
              :
              <Button variant="secondary" onClick={undoChanges} className="mr-2">Undo</Button>

            }
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default NoteEdit;
