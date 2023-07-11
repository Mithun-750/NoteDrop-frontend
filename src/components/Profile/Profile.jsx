import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Notecontext from '../../context/notes/Notecontext';

const Profile = () => {
    const context = useContext(Notecontext)
    const { setLoggedin, Loggedin, authToken, setauthToken } = context
    const [Name, setName] = useState('Name')
    const [Email, setEmail] = useState('Email')

    const handleLogout = () => {
        if (Loggedin) {
            setauthToken('')
            setLoggedin(false)
            localStorage.removeItem('token')
        }
    }


    useEffect(() => {
        const getUserDetails = () => {
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            };

            fetch(`https://notedrop-backend.onrender.com/api/auth/getuser`, {
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

        return () => {
            if (localStorage.getItem('token') !== '') {
                getUserDetails()
            }
        }
    }, [authToken, Loggedin])


    return (
        <div className="Profile">
            <div className="card-client">
                <div className="user-picture">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                    </svg>
                </div>
                <p className="name-client">
                    {Name}
                    <span>{Email}</span>
                </p>
                <button className='Logoutbtn' onClick={handleLogout} >Log out</button>
            </div>
        </div>
    );
}

export default Profile;
