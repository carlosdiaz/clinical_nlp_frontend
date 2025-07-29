// src/App.js
import React, { useState } from "react";
import Login from "./components/Login"; // Import the Login component
import FileUpload from "./components/FileUpload"; // Import the FileUpload component
import "./App.css"; // Keep your main app styling

function App() {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially false

    // Function to call when login is successful
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        // In a real app, you might also store a token here
    };

    return (
        <div className="app-container">
            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
                <FileUpload />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;