import { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NoteList.css';
import ColorFilterDropdown from './ColorFilterDropdown';

const NoteList = () => {
  const { notes, deleteNote } = useContext(NoteContext);
  const [search, setSearch] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const filteredNotes = notes.filter(note =>
    (colorFilter === '' || note.color === colorFilter) &&
    (note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Form className="mb-4 d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow-1 me-2"
        />
        <ColorFilterDropdown selectedColor={colorFilter} onSelectColor={setColorFilter} />
      </Form>
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <Link to={`/${note.id}`} style={{ textDecoration: 'none' }}>
              <Card className={`h-100 d-flex flex-column sticky-note ${note.color}`}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{note.title.length > 30 ? note.title.substring(0, 30) + '...' : note.title}</Card.Title>
                  <Card.Text>
                    {note.text.length > 130 ? note.text.substring(0, 130) + '...' : note.text}
                  </Card.Text>
                  <div className="mt-auto d-flex justify-content-end">
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteNote(note.id);
                      }}
                    >
                      <img src="/delete.png" alt="Delete" className="icon-button" />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to="/add" className="btn btn-success mt-4">Add New Note</Link>
    </>
  );
};

export default NoteList;
