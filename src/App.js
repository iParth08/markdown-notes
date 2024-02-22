import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  // Global state for notes
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  // set in local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //function to add notes
  const onAddNote = () => {
    setNotes([
      ...notes,
      {
        id: uuid(),
        title: "Untitled Note",
        body: "",
        lastModified: Date.now(),
      },
    ]);
  };

  //function to delete notes
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  //function to fetch active note
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  //function to update notes
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  //function to edit notes
  const onEditNote = (id) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          lastModified: Date.now(),
        };
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };
  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        onUpdateNote={onUpdateNote}
        onEditNote={onEditNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
