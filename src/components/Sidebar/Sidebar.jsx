import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {

    let location = useLocation()


    return (
        <>
            <div id='sidebar'>
                <div id='note-actions' >
                    <Link to='/' className='nav-element'>
                        <span className={`material-symbols-outlined ${location.pathname === '/' ? 'active-route' : ''}`}>
                            note
                        </span>
                        <h2>Notes</h2>
                    </Link>
                    <Link to='/addnote' className='nav-element'>
                        <span className={`material-symbols-outlined ${location.pathname === '/addnote' ? 'active-route' : ''}`}>
                            note_add
                        </span>
                        <h2>Add Note</h2>
                    </Link>
                    <Link to='/findnote' className='nav-element'>
                        <span className={`material-symbols-outlined ${location.pathname === '/findnote' ? 'active-route' : ''}`}>
                            find_in_page
                        </span>
                        <h2>Find Note</h2>
                    </Link>
                </div>

                <div id='site-actions'>

                    <Link to='/profile' className="nav-element">
                        <span className={`material-symbols-outlined ${location.pathname === '/profile' ? 'active-route' : ''}`}>
                            account_circle
                        </span>
                        <h2>Profile</h2>
                    </Link>
                    <Link to='/about' className={`nav-element `}>
                        <span className={`material-symbols-outlined  ${location.pathname === '/about' ? 'active-route' : ''}`}>
                            lightbulb
                        </span>
                        <h2>About</h2>
                    </Link>
                </div>
            </div>
        </>
    )
}
