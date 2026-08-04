import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  
  // 1. New States for form inputs and tracking edits
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null); 

  function fetchNotes() {
    axios.get('https://backend-twts.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  // 2. Handle Submit now handles BOTH Create and Update
  function handleSubmit(e) {
    e.preventDefault()

    if (editId) {
      // UPDATE EXISTING NOTE
      axios.patch("https://backend-twts.onrender.com/api/notes/" + editId, { title, description })
        .then(res => {
          fetchNotes();
          setTitle('');
          setDescription('');
          setEditId(null);
        })
        .catch(err => console.log(err));
    } else {
      // CREATE NEW NOTE
      axios.post("https://backend-twts.onrender.com/api/notes", { title, description })
        .then(res => {
          fetchNotes();
          setTitle('');
          setDescription('');
        })
        .catch(err => console.log(err));
    }
  }

  function handleDeleteNote(noteId) {
    axios.delete("https://backend-twts.onrender.com/api/notes/" + noteId)
      .then(res => {
        fetchNotes()
      })
  }

  // This function fills the input boxes when Edit is clicked
  function startEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit} >
        <input 
          name='title' 
          type="text" 
          placeholder='Enter title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          name='description' 
          type="text" 
          placeholder='Enter Description' 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">{editId ? "Update Note" : "Create note"}</button>
      </form>

      <div className="notes">
        {
          notes.map((note, index) => {
            return (
              <div className="note" key={note._id || index}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button onClick={() => { handleDeleteNote(note._id) }}>Delete</button>
                <button onClick={() => { startEdit(note) }}>Edit</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App