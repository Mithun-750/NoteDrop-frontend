import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notecontext from '../../context/notes/Notecontext';
import './AddNote.css'

export default function AddNote({ setmessage, setShowmessage }) {
    const context = useContext(Notecontext)
    const { addNote } = context
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('General');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const newNote = {
                title: title.trim(),
                description: description.trim(),
                tag: tag.trim(),
                date: Date.now(),
                updated: Date.now(),
            };
            addNote(newNote);
            setTitle('');
            setDescription('');
            setTag('');


            setmessage("Note added sucessfully!!")
            setShowmessage(true)

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        if (inputTitle.length <= 25) {
            setTitle((inputTitle).replace(/ {2,}$/g, ' '));
        } else {
            setTitle(inputTitle.slice(0, 25));
        }
    };


    return (
        <div className="AddNote">
            <form className='addnote-form' onSubmit={handleSubmit}>
                <h1>Add a Note</h1>
                <input
                    type="text"
                    className="add-title form-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter a title"
                    required
                    minLength={3}
                    maxLength={25}
                />
                <textarea
                    className="add-description form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description"
                    required
                    minLength={5}
                ></textarea>
                <input
                    type="text"
                    className="add-tag form-input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter a tag &#35;"
                />
                <button className='addnote-btn' type="submit">Add Note</button>
            </form>
        </div>
    );
}
