import './App.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NoteContext, NoteProvider } from './context/NoteContext';
import NoteAdd from './components/NoteAdd';
import NoteEdit from './components/NoteEdit';
import NoteList from './components/NoteList';
import Header from './components/Header';
import { useContext } from 'react';

function App() {
  return (
    <NoteProvider>
      <MainContent />
    </NoteProvider>
  );
}

const MainContent = () => {
  const { darkMode } = useContext(NoteContext);

  return (
    <div className="app">
      <Header />
      <h1>{darkMode == true ? 'dark' : 'light'} hellooo</h1>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/add" element={<NoteAdd />} />
          <Route path="/:id" element={<NoteEdit />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
