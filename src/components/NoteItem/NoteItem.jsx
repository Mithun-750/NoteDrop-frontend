/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './NoteItem.css'
import Notecontext from '../../context/notes/Notecontext';
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, setmessage, setShowmessage }) => {
    const navigate = useNavigate()

    const context = useContext(Notecontext)
    const { deleteNote } = context

    const getTimeAgo = (timeString) => {
        const currentTime = new Date();
        const time = new Date(timeString);

        const timeDifference = currentTime.getTime() - time.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

        if (years > 0) {
            if (months > 0) {
                return `${years} year${years > 1 ? 's' : ''}, ${(months % 12)} month${months > 1 ? 's' : ''} ago`;
            } else {
                return `${years} year${years > 1 ? 's' : ''} ago`;
            }
        } else if (months > 0) {
            if (days > 0) {
                if (hours > 0) {
                    return `${months} month${months > 1 ? 's' : ''}, ${(days % 30)} day${days > 1 ? 's' : ''}`;
                } else {
                    return `${months} month${months > 1 ? 's' : ''}, ${days} day${days > 1 ? 's' : ''} ago`;
                }
            }
        } else if (days > 0) {
            if (hours > 0) {
                return `${days} day${days > 1 ? 's' : ''}, ${(hours % 24)} hour${hours > 1 ? 's' : ''} ago`;
            } else {
                return `${days} day${days > 1 ? 's' : ''} ago`;
            }
        } else if (hours > 0) {
            if (minutes > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''}, ${(minutes % 60)} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            }
        } else if (minutes > 0) {
            if (seconds > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''}, ${(seconds % 60)} second${seconds > 1 ? 's' : ''} ago`;
            } else {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            }
        } else {
            return 'Just now';
        }
    };

    const handleDeleteNote = () => {
        deleteNote(note._id);
        setmessage('Note deleted successfully!!');
        setShowmessage(true);

    };


    return (
        <div className='NoteItem tooltip'>
            <h3>
                {note.title}
            </h3>
            <p>
                {note.description}
            </p>
            <div>
                <div>
                    <span className="material-symbols-outlined">
                        label
                    </span>
                    {note.tag}
                </div>
                <div>
                    {(note.date === note.updated) ? `Created ${getTimeAgo(note.date)}` : `Updated ${getTimeAgo(note.updated)}`}
                </div>
            </div>
            <div className="tooltipcontent">
                <button>
                    <span className="material-symbols-outlined" onClick={() => { navigate(`/edit/${note._id}`) }} >
                        edit
                    </span>
                </button>
                <button className='top-10' onClick={handleDeleteNote}>
                    <span className="material-symbols-outlined">
                        Delete
                    </span>
                </button>
            </div>

        </div>
    )
}

export default NoteItem
