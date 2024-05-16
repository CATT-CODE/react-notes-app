import { createContext, useState, useEffect } from 'react';

const NoteContext = createContext();

// eslint-disable-next-line react/prop-types
const NoteProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedDarkMode !== null ? savedDarkMode : false;
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    return savedNotes !== null ? savedNotes : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  return (
    <NoteContext.Provider value={{ darkMode, toggleDarkMode, notes, addNote, deleteNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, NoteContext };
