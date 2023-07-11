import React, { useContext } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Notecontext from '../../context/notes/Notecontext';
import NoteItem from '../NoteItem/NoteItem'


export default function Home({ setShowmessage, setmessage }) {
    const context = useContext(Notecontext)
    const { Notes } = context


    return (
        <div className='AllNotes'>

            <Link to={'/addnote'} className="addnote-home">
                <span className="material-symbols-outlined">
                    add_notes
                </span>
                <h2>Add New Note</h2>
            </Link>
            {Notes.map((note) => {
                return <NoteItem note={note} key={note._id} setShowmessage={setShowmessage} setmessage={setmessage} />
            })}


        </div>
    )
}
