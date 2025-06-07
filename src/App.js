import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [docId, setDocId] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            console.log('About to send the file ', formData);
            // const res = await axios.post("/api/upload", formData);
            const res = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('This is the response' ,res);
            // setDocId(res.data.id);

            // const docRes = await axios.get(`/api/document/${res.data.id}`);
            // const docRes = await axios.get(`http://localhost:5000/api/document/${res.data.id}`)
            // setSummary(docRes.data.summary);
        } catch (err) {
            console.error('Error ', err);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Clinical Notes Summarizer</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Processing..." : "Upload and Analyze"}
            </button>


            {/*{docId && (*/}
            {/*    <div className="result">*/}
            {/*        <h3>Document ID:</h3>*/}
            {/*        <p>{docId}</p>*/}
            {/*        <h3>Summary:</h3>*/}
            {/*        <p>{summary}</p>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default App;
