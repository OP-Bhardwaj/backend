import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([])

  // Fetch all notes from the backend
  function fetchNotes() {
    axios.get("https://backend-twts.onrender.com/api/notes")
      .then(res => {
        // Ensure we are setting an array even if the backend is empty
        setNotes(res.data.notes || [])
      })
      .catch(err => console.error("Error fetching notes:", err))
  }

  // Run fetchNotes once when the component first loads
  useEffect(() => {
    fetchNotes()
  }, [])

  // Handle creating a new note
  function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const title = form.elements.title.value
    const description = form.elements.description.value

    // Prevent sending empty notes
    if (!title || !description) {
      alert("Please enter both a title and a description!")
      return
    }

    axios.post("https://backend-twts.onrender.com/api/notes", {
      title: title,
      description: description
    })
      .then(res => {
        // Refresh the list of notes to show the new one
        fetchNotes()
        // Clear the input boxes
        form.reset() 
      })
      .catch(err => console.error("Error creating note:", err))
  }

  // Handle deleting a note
  function handleDeleteNote(noteId) {
    axios.delete(`https://backend-twts.onrender.com/api/notes/${noteId}`)
      .then(res => {
        // Refresh the list of notes to remove the deleted one from the screen
        fetchNotes()
      })
      .catch(err => console.error("Error deleting note:", err))
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button type="submit">Create note</button>
      </form>

      <div className="notes">
        {notes.length === 0 ? (
          <p>No notes found. Create one above!</p>
        ) : (
          notes.map(note => {
            return (
              /* Added the required React key prop here */
              <div className="note" key={note._id}> 
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default App