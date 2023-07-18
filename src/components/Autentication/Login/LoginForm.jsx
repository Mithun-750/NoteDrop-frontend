import React, { useContext, useState, useEffect } from 'react';
import './LoginForm.css';
import Notecontext from '../../../context/notes/Notecontext'

const LoginForm = ({ setmessage, setShowmessage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state variable
    const context = useContext(Notecontext);
    const { setauthToken, setLoggedin, getallnotes, authToken, baseurl } = context;

    useEffect(() => {
        if (authToken) {
            setLoggedin(true);
            getallnotes();
        }
    }, [authToken, setLoggedin, getallnotes]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
        };

        const body = { email, password };

        fetch(`${baseurl}auth/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setauthToken(data.token);
                    localStorage.setItem('token', data.token)
                    setmessage(`\u{1F44B} Welcome ${((data.name).charAt(0).toUpperCase() + data.name.slice(1))}!`)
                    setShowmessage(true)
                } else {
                    alert(data.error)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
        };

        const body = { name, email, password };
        fetch(`${baseurl}auth/signup`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setauthToken(data.token);
                    localStorage.setItem('token', data.token)
                    setmessage(`\u{1F44B} Welcome ${((data.name).charAt(0).toUpperCase() + data.name.slice(1))}!`)
                    setShowmessage(true)
                } else {
                    alert(data.error)
                }
            })
            .catch((error) => {
                console.error(error);
            });

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="login">
                <form className="form" onSubmit={handleLoginSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Log in
                    </label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        className="input"
                        type={showPassword ? 'text' : 'password'} // Show or hide password based on the state
                        name="pswd"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <label htmlFor="showPasswordCheckbox_login" className="show-password-label">
                        <input
                            type="checkbox"
                            id="showPasswordCheckbox_login"
                            className='showPasswordCheckbox'
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        Show Password
                    </label>
                    <button type="submit">Log in</button>
                </form>
            </div>

            <div className="register">
                <form className="form" onSubmit={handleSignupSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Register
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="txt"
                        placeholder="Username"
                        value={name}
                        onChange={handleNameChange}
                        required
                        minLength={3}
                        maxLength={25}
                    />
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        className="input"
                        type={showPassword ? 'text' : 'password'} // Show or hide password based on the state
                        name="pswd"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                    />
                    <label htmlFor="showPasswordCheckbox_signup" className="show-password-label">
                        <input
                            type="checkbox"
                            id="showPasswordCheckbox_signup"
                            className='showPasswordCheckbox'
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        Show Password
                    </label>
                    <button>Register</button>
                </form>
            </div>

        </div>
    );
};

export default LoginForm;
