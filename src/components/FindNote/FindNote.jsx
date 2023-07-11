import { useContext, useEffect, useState } from 'react'
import './FindNote.css'
import Notecontext from '../../context/notes/Notecontext';
import NoteItem from '../NoteItem/NoteItem'

export default function FindNote({ setShowmessage, setmessage }) {
    const context = useContext(Notecontext)
    const { Notes } = context

    const [searchbyT, setsearchbyT] = useState('')
    const [searchTag, setsearchTag] = useState('')
    const [Filterdnotes, setFilterdnotes] = useState(Notes)

    useEffect(() => {
        setFilterdnotes(Notes)
    }, [Notes])

    useEffect(() => {
        let newNotes = Notes.filter((note) => note.title.toLowerCase().includes(searchbyT.toLowerCase()));
        newNotes = newNotes.filter((note) => note.tag.toLowerCase().includes(searchTag.toLowerCase()))

        setFilterdnotes(newNotes)

    }, [searchbyT, Notes, searchTag])

    return (
        <div className='FindNote' >
            <div className="searchfilters">
                <input type="text" name="" id=""
                    placeholder='Search By Title'
                    value={searchbyT}
                    onChange={(e) => setsearchbyT(e.target.value)}
                    className='searchbyT'
                />
                <input type="text" name="" id=""
                    placeholder='Search By Tag'
                    value={searchTag}
                    onChange={(e) => setsearchTag(e.target.value)}
                    className='searchTag'
                />
            </div>
            <div className="filterdnotes">
                {Filterdnotes.map((note) => {
                    return <NoteItem note={note} key={note._id} setShowmessage={setShowmessage} setmessage={setmessage} />
                })}
            </div>

        </div>
    )
}
