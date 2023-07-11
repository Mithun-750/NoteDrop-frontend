import React, { useEffect } from 'react';
import './Message.css';

export default function Message({ message, Showmessage, setShowmessage }) {
    useEffect(() => {
        if (document.getElementById('Message')) {
            setTimeout(() => {

                document.getElementById('Message').classList.add('remove');
            }, 2000);
        }
        if (Showmessage) {
            setTimeout(() => {
                setShowmessage(false)
                document.getElementById('Message').classList.remove('remove');
            }, 3000);
        }
    }, [Showmessage, setShowmessage]);

    return Showmessage ? (
        <div className="messageouter">
            <div id='Message'>
                <h2>{message}</h2>
            </div>
        </div>
    ) : null;
}
