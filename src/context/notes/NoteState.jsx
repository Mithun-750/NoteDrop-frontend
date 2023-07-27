/* eslint-disable react/prop-types */
import Notecontext from "./Notecontext";
import { useEffect, useState } from "react";

const NoteState = (props) => {

    const [authToken, setauthToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [Notes, setNotes] = useState([])
    const [Loggedin, setLoggedin] = useState(false)
    const [Name, setName] = useState('Name')
    const [Email, setEmail] = useState('Email')

    const baseurl = import.meta.env.VITE_BASE_URL;
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': authToken,
    };


    const getallnotes = async () => {
        await fetch(`${baseurl}notes/getallnotes`, {
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

    const updateNote = async (updatednote) => {

        const body = {
            title: updatednote.title,
            description: updatednote.description,
            tag: updatednote.tag,
        };

        await fetch(`${baseurl}notes/updatenote/${updatednote._id}`, {
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

    const getUserDetails = async () => {

        const headers = {
            'Content-Type': 'application/json',
            'auth-token': authToken,
        };

        await fetch(`${baseurl}auth/getuser`, {
            method: 'POST',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setName((data.user.name).charAt(0).toUpperCase() + data.user.name.slice(1))
                    setEmail(data.user.email)
                } else {
                    alert(data.error)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        return async () => {
            if (authToken) {
                if (authToken !== '') {
                    try {
                        await getallnotes()
                        await getUserDetails()
                        setLoggedin(true)
                    } catch (error) {
                        console.error(error)
                    }

                }
            }
        }
    }, [authToken])


    return (
        <Notecontext.Provider value={{ baseurl, Notes, addNote, deleteNote, updateNote, setauthToken, Loggedin, setLoggedin, getallnotes, authToken, Name, Email }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;
