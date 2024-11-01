// src/Contact.js
import React, { useState } from 'react';
import '../CSS/Contact.css'; // optional, for styling

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.status === 200) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Error sending message.');
            }
        } catch (error) {
            setStatus('Error sending message.');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>145 Stanly Road<br/>Jaffna, Srilanka</p>
                <p>📞 +94 77 123 4567</p>
                <p>📧 support@wayX.com</p>
            </div>

            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Enter Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">SUBMIT</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
};

export default Contact;
