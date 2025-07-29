// src/components/Login.js
import React, { useState } from 'react';
import api from '../api'; // Use your configured axios instance
import './Login.css'; // Import the CSS file for the login component

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setMessage(''); // Clear previous messages
        setLoading(true); // Set loading state

        try {
            const response = await api.post('api/login', { // Use the /login endpoint
                username,
                password,
            });

            const data = response.data; // Axios puts response data in .data

            if (response.status === 200) {
                setMessage(`Success: ${data.message}`);
                console.log('Login successful:', data);
                // Call the prop function to signal success to the parent (App.js)
                onLoginSuccess();
            } else {
                // This block might not be hit if Flask returns 401 and axios throws an error
                setMessage(`Error: ${data.message}`);
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Login error:', error);
            // Axios errors for non-2xx responses are typically in error.response
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('Network Error: Could not connect to the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage(`An unexpected error occurred: ${error.message}`);
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="login-username">Username (Email)</label>
                    <input
                        type="email"
                        id="login-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="enter your email"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="enter your password"
                        disabled={loading}
                    />
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
                <p className="forgot-password">
                    <a href="#">Forgot Password?</a>
                </p>
                <p className="signup-link">
                    Don't have an account? <a href="#">Sign Up</a>
                </p>
            </form>
        </div>
    );
}

export default Login;