import {useState, useEffect} from 'react'
import noteService from './services/notes.js'
import Note from './components/Note'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes)
        })
    }

    useEffect(hook, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }

        noteService.create(noteObject).then(createdNote => {
            setNotes(notes.concat(createdNote))
            setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote).then(updatedNote => {
            setNotes(notes.map(note => note.id === id ? updatedNote : note))
        }).catch(error => {
            alert(`the note ${note.content} was already deleted from server`)
            setNotes(notes.filter(n => n.id !== id))
        })
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note toggleImportance={() => toggleImportanceOf(note.id)} key={note.id} note={note}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App 
