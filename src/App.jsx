import { useContext, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'
import Home from './components/Home/Home'
import About from './components/About/About';
import NoteState from './context/notes/NoteState';
import AddNote from './components/AddNote/AddNote';
import Notecontext from './context/notes/Notecontext';
import EditNote from './components/EditNote/EditNote';
import FindNote from './components/FindNote/FindNote';
import Message from './components/Message/Message';
import Auth from './components/Autentication/Auth';
import Profile from './components/Profile/Profile';
import { Provider, useSelector } from 'react-redux';
import { store } from './state/store';

function App() {
  const context = useContext(Notecontext)
  const { Notes } = context

  const authStatus = useSelector(state => state.status)

  const [message, setmessage] = useState('Sucess!!')
  const [Showmessage, setShowmessage] = useState(false)


  return (
    <>
      {(!authStatus) && (
        <Auth setShowmessage={setShowmessage} setmessage={setmessage} />
      )}
      <Sidebar />
      <div id="app">
        <div className="side-space"></div>
        <Message Showmessage={Showmessage} message={message} setShowmessage={setShowmessage} />
        <Routes>
          <Route path="/" element={<Home Notes={Notes} setShowmessage={setShowmessage} setmessage={setmessage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/addnote" element={<AddNote setShowmessage={setShowmessage} setmessage={setmessage} />} />
          <Route path="/findnote" element={<FindNote setShowmessage={setShowmessage} setmessage={setmessage} />} />
          <Route path="/profile" element={<Profile />} />
          {Notes.map((note) => (
            <Route
              key={note._id}
              path={`/edit/${note._id}`}
              element={<EditNote note={note} setShowmessage={setShowmessage} setmessage={setmessage} />}

            />
          ))}

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
export function APPwithRouter() {
  return (
    <Router>
      <Provider store={store}>
        <NoteState>
          <App />
        </NoteState>
      </Provider>
    </Router>
  );
}

export default APPwithRouter
