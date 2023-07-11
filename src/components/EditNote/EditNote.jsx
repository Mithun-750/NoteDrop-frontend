/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from '../../context/notes/Notecontext';
import './EditNote.css';

export default function EditNote({ note, setmessage, setShowmessage }) {
    const context = useContext(Notecontext);
    const { updateNote } = context;
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [tag, setTag] = useState(note.tag);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (title.trim().length < 3) {
                alert('Enter a valid title between 3-25 characters')

            } else if (description.trim() === '') {
                alert('Description is required')

            } else {
                const updatednote = note

                updatednote.title = title.trim()
                updatednote.description = description.trim()
                updatednote.tag = tag.trim()
                updatednote.updated = Date.now()
                updateNote(updatednote);

                setmessage("Note updated sucessfully!!")
                setShowmessage(true)

                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        if (inputTitle.length <= 25) {
            setTitle(inputTitle);
        } else {
            setTitle(inputTitle.slice(0, 25));
        }
    };

    return (
        <div className="AddNote">
            <form className="addnote-form" onSubmit={handleSubmit}>
                <h1>Update Note</h1>
                <input
                    type="text"
                    className="add-title form-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter a title"
                    required
                />
                <textarea
                    className="add-description form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description"
                    required
                ></textarea>
                <input
                    type="text"
                    className="add-tag form-input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter a tag &#35;"
                />
                <button className="addnote-btn" type="submit">
                    Update Note
                </button>
            </form>
        </div>
    );
}
