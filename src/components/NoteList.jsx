import { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NoteList() {
  const { notes, deleteNote } = useContext(NoteContext);
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <Card className="h-100 d-flex flex-column">
              <Card.Body className='d-flex flex-column'>
                <Card.Title>{note.title.length > 30 ? note.title.substring(0, 30)+'...' : note.title}</Card.Title>
                <Card.Text>
                  {note.text.length > 125 ? note.text.substring(0, 125)+'...' : note.text}
                </Card.Text>
                <div className='mt-auto d-flex justify-content-between'>
                  <Link to={`/${note.id}`} className="btn">
                    <img src='/editing.png' />
                  </Link>
                  <button className='btn' onClick={() => {deleteNote(note.id)}}>
                    <img src='/delete.png' />
                  </button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/add" className="btn btn-success mt-4">Add New Note</Link>
    </>
  );
}

export default NoteList