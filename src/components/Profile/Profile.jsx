import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { authToken, loginStatus } from '../../state/action-creators';

const Profile = () => {
    const authStatus = useSelector(state => state.status)
    const dispatch = useDispatch()
    const Name = useSelector(state => state.name)
    const Email = useSelector(state => state.email)
    const Since = useSelector(state => state.since)

    const getTimeAgo = (timeString) => {
        const currentTime = new Date();
        const time = new Date(timeString);

        const timeDifference = currentTime.getTime() - time.getTime();
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;

        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''}`;

        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;

        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;

        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    };

    const handleLogout = () => {
        if (authStatus) {
            dispatch(authToken(''))
            localStorage.removeItem('token')
            dispatch(loginStatus(false))
        }
    }


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
                    <span>User since {getTimeAgo(Since)}</span>
                </p>
                <button className='Logoutbtn' onClick={handleLogout} >Log out</button>
            </div>
        </div>
    );
}

export default Profile;
