import React from 'react';
import './About.css'

const About = () => {
    return (
        <div id='about'>
            <h2>About NoteDrop</h2>
            <p>
                NoteDrop is a web application designed to help you easily store and manage your notes in a convenient and organized manner. Whether you're a student, a professional, or just someone who loves jotting down ideas, NoteDrop has you covered.
            </p>
            <h3>Features</h3>
            <ul>
                <li>Effortless Note Management: Create, edit, and organize your notes seamlessly.</li>
                <li>Tagging System: Add tags to your notes for efficient categorization and quick retrieval.</li>
                <li>Powerful Search: Easily locate notes using search by title or tag.</li>
                <li>Secure and Personalized: User authentication ensures your notes are private and accessible only by you.</li>
                <li>Custom Profile Theme: Enjoy a visually pleasing experience with the elegant profile theme.</li>
                <li>Easy Sign-up and Login: Streamlined login and sign-up components for a smooth user experience.</li>
            </ul>
            <h3>How It Works</h3>
            <ol>
                <li>Sign Up: Create a secure account to get started. Your privacy is our priority.</li>
                <li>Add Notes: Start adding your notes, and organize them with descriptive tags.</li>
                <li>Effortless Retrieval: Use the powerful search functionality to find your notes quickly.</li>
                <li>Stay Organized: Keep your notes neat and organized with our intuitive tagging system.</li>
            </ol>
            <h3>Why NoteDrop?</h3>
            <p>
                NoteDrop is designed to simplify your note-taking and management process. With a focus on user-friendly design and efficient features, it's your perfect companion for staying organized in a digital world.
            </p>
            <h3>Who We Are</h3>
            <p>
                NoteDrop was created by Mithun, a web developer with a vision for user-friendly applications that enhance productivity and organization.
            </p>
            <h3>Website loads slowly?</h3>
            <p>
                The backend server for NoteDrop is hosted on Render. Please note that after a period of inactivity, the server might respond slowly initially, but it will regain its speed once it's active again.
            </p>
            <h3>Contact Us</h3>
            <p>
                Have questions, suggestions, or feedback? Feel free to reach out to us at <a href="mailto:your@email.com">your@email.com</a>.
            </p>
            <p>
                Source Code: <a href="https://github.com/Mithun-750/NoteDrop-frontend" target='__blank'>Frontend</a> :: <a href="https://github.com/Mithun-750/NoteDrop-backend" target='__blank'>Backend</a>
            </p>

            <h6>Yes, About section was generatted by chatGPT</h6>
        </div>
    );
};

export default About;
