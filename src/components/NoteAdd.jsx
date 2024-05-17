import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import ColorFilterDropdown from './ColorFilterDropdown';
import './NoteEditAdd.css';
import { generateNote } from '../utils/api';

function NoteAdd() {
  const { addNote, updateNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: Date.now(),
    title: '',
    text: '',
    color: 'yellow',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');
  const isNewNote = useRef(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedNote = { ...note, [name]: value };
    setNote(updatedNote);
    autoSave(updatedNote);
  };

  const handleColorChange = (color) => {
    if (!color) {
      color = 'yellow'
    }
    const updatedNote = { ...note, color: color };
    setNote(updatedNote);
    autoSave(updatedNote);
  };

  const autoSave = (updatedNote) => {
    if (isNewNote.current) {
      addNote({
        ...updatedNote,
        id: note.id
      });
      isNewNote.current = false;
    } else {
      updateNote({
        ...updatedNote,
        id: note.id
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    autoSave(note);
    navigate('/');
  };

  const generateNoteFromPrompt = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedText = await generateNote(prompt);
      const updatedNote = { ...note, text: generatedText };
      setNote(updatedNote);
      autoSave(updatedNote);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (loading) {
        setLoading(false);
      }
    };
  }, [loading]);

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
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3">
          <div className="mb-2 mb-sm-0">
            <Button variant="danger" onClick={() => navigate('/')} className="me-2">Back</Button>
          </div>
          <div className="d-flex flex-column flex-sm-row align-items-center">
            <Form.Control
              type="text"
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-2 mb-sm-0 me-sm-2"
              style={{ width: '300px' }}
            />
            <Button variant="primary" onClick={generateNoteFromPrompt} disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <><img src='/sparkle.png' style={{height: '16px'}} /><span> Generate</span></>}
            </Button>
          </div>
        </div>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default NoteAdd;
