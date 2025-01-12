import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setError(""); // Clear any previous errors
    setShortUrl(""); // Clear any previous short URL
    try {
      const response = await axios.post("http://localhost:5089/api/shorten", {
        url: longUrl,
      });

      // Access the shortened URL from the response
      setShortUrl(response.data || "Error: No URL returned");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten the URL");
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten URL</button>
      {error && <div className="result error">{error}</div>}
      {shortUrl && (
        <div className="result">
          <strong>Shortened URL:</strong> <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;
