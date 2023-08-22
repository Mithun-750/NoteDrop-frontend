/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Notecontext from "./Notecontext";
import { useEffect, useState } from "react";
import { EmailValue, NameValue, authToken, loginStatus, SinceValue } from "../../state/action-creators";

const NoteState = (props) => {

    const Token = useSelector(state => state.authToken)
    const [Notes, setNotes] = useState([])
    const authStatus = useSelector(state => state.status)
    const dispatch = useDispatch()

    const baseurl = import.meta.env.VITE_BASE_URL;
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': Token,
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
            'auth-token': Token,
        };

        await fetch(`${baseurl}auth/getuser`, {
            method: 'POST',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(NameValue((data.user.name).charAt(0).toUpperCase() + data.user.name.slice(1)))
                    dispatch(EmailValue(data.user.email))
                    dispatch(SinceValue(data.user.joined))
                } else {
                    alert(data.error)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        dispatch(authToken(localStorage.getItem('token') ? localStorage.getItem('token') : ''));
        if (Token && !authStatus) {
            if (Token !== '') {
                try {
                    getallnotes()
                    getUserDetails()
                    dispatch(loginStatus(true))
                } catch (error) {
                    console.error(error)
                }

            }
        }
    }, [])




    return (
        <Notecontext.Provider value={{ baseurl, Notes, addNote, deleteNote, updateNote, getallnotes }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;
