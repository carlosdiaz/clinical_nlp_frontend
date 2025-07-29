// src/components/FileUpload.js
import React, { useState } from "react";
// Assuming you have an api.js for axios calls.
// If not, you can import axios directly: import axios from "axios";
import api from "../api"; // Adjust path if api.js is in a different location
import "./FileUpload.css"; // We'll create this for specific FileUpload styling

function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [diseases, setDiseases] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            // Use your configured axios instance from api.js
            const res = await api.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { summary, diseases } = res.data;
            setSummary(summary);
            setDiseases(diseases);
        } catch (err) {
            console.error("Error uploading file:", err);
            // More user-friendly error message
            alert(`Upload failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h1 className="file-upload-title">Clinical Notes Summarizer</h1>

            <div className="upload-section">
                <label htmlFor="fileInput" className="file-label">Upload clinical note:</label>
                <input id="fileInput" type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading} className="upload-button">
                    {loading ? "Processing..." : "Upload and Analyze"}
                </button>
            </div>

            {summary && (
                <div className="results-section">
                    <h2 className="results-title">Analysis Results</h2>
                    <div className="columns">
                        <div className="column">
                            <h4>Summary</h4>
                            <textarea
                                value={JSON.stringify(summary, null, 2)}
                                readOnly
                                rows={16}
                                className="results-textarea summary"
                            />
                        </div>

                        <div className="column">
                            <h4>Result</h4>
                            <textarea
                                value={JSON.stringify(diseases, null, 2)}
                                readOnly
                                rows={16}
                                className="results-textarea result"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUpload;