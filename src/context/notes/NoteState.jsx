/* eslint-disable react/prop-types */
import Notecontext from "./Notecontext";
import { useEffect, useState } from "react";

const NoteState = (props) => {

    const [authToken, setauthToken] = useState('')
    const [Notes, setNotes] = useState([])
    const [Loggedin, setLoggedin] = useState(false)

    const baseurl = 'https://notedrop-backend.onrender.com/api/';
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': authToken,
    };


    const getallnotes = () => {
        fetch(`${baseurl}notes/getallnotes`, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                setNotes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const addNote = (newNote) => {
        const body = {
            title: newNote.title,
            description: newNote.description,
            tag: newNote.tag,
        };

        fetch(`${baseurl}notes/newnote`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setNotes([...Notes, data.note]);
                }
            })
            .catch(error => {
                console.error(error);
            });

    };

    const deleteNote = (Id) => {


        fetch(`${baseurl}notes/deletenote/${Id}`, {
            method: 'DELETE',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const newNotes = Notes.filter((note) => { return note._id !== Id })

                    setNotes(newNotes)
                }
            })
            .catch(error => {
                console.error(error);
            });

    }
    const updateNote = (updatednote) => {

        const body = {
            title: updatednote.title,
            description: updatednote.description,
            tag: updatednote.tag,
        };

        fetch(`${baseurl}notes/updatenote/${updatednote._id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    Notes.forEach(note => {
                        if (note._id === updatednote._id) {
                            note = data.note;
                        }
                    });

                }
            })
            .catch(error => {
                console.error(error);
            });

    }

    const CheckHistory = async () => {
        console.log("hello")
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token') || (localStorage.getItem('token') !== '')) {
            await setauthToken(localStorage.getItem('token'))
            if (authToken !== '') {
                console.log('hello')
                setLoggedin(true)
                getallnotes()
            }
        }
    }


    return (
        <Notecontext.Provider value={{ Notes, addNote, deleteNote, updateNote, setauthToken, Loggedin, setLoggedin, getallnotes, authToken, CheckHistory }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;