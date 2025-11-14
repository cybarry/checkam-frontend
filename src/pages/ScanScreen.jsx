import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyCode } from '../api';
import './styles.css'; // Make sure to add styles for the modal
import { createWorker } from 'tesseract.js';

export default function ScanScreen() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    
    // --- NEW STATE for our "Confirm" Modal ---
    const [scannedCode, setScannedCode] = useState(""); // The code in the modal's input
    const [showModal, setShowModal] = useState(false); // Controls the modal
    const [scanProgress, setScanProgress] = useState(null);

    const fileInputRef = useRef(null);

    // This is called from the MODAL's "Verify" button
    const handleVerify = async () => {
        setIsLoading(true); // Show main page loading
        setShowModal(false); // Hide the modal
        setApiError(null);
        
        try {
            const res = await verifyCode(scannedCode); // Use the code from the modal
            const { status, ...data } = res.data; 
            
            if (status === 'verified') {
                navigate("/verified", { state: data });
            } else if (status === 'not_found') {
                navigate("/warning", { state: data });
            } else if (status === 'replay_attack' || status === 'reported') {
                navigate("/critical", { state: data });
            }

        } catch (err) {
            console.error("API Error:", err);
            setApiError("Error connecting to server. Is the API running?");
        } finally {
            setIsLoading(false);
        }
    };

    // This triggers the camera
    const handleCameraScan = () => {
        fileInputRef.current.click();
    };

    // This runs after the user takes a picture
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true); // Show loading on the main page
        setApiError(null);
        setScanProgress("Starting AI worker...");

        try {
            const worker = await createWorker('eng');
            await worker.setParameters({
                tessedit_char_whitelist: '0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            });
            
            setScanProgress("Recognizing text from image...");
            const { data: { text } } = await worker.recognize(file);
            await worker.terminate(); 

            // --- THE NEW LOGIC ---
            // 1. Set the code for the modal
            setScannedCode(text.trim()); 
            // 2. SHOW THE MODAL!
            setShowModal(true); 

        } catch (err) {
            console.error("OCR Error:", err);
            setApiError("AI Scan Failed. Please try again.");
            setScanProgress(null);
        } finally {
            setIsLoading(false); // Hide main page loading
            setScanProgress(null);
            event.target.value = null; // Clear the input
        }
    };

    return (
        <div className="screen-container">
            {/* --- 1. The hidden file input --- */}
            <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* --- 2. The Main Page UI --- */}
            <div className="camera-placeholder">
                <h1>CheckAm</h1>
                <p>Verify your product code</p>
                {isLoading && !showModal && <h3>{scanProgress || "Verifying..."}</h3>}
                {apiError && <p style={{color: 'red'}}>{apiError}</p>}
            </div>

            <button 
                className="scan-camera-button" 
                onClick={handleCameraScan}
                disabled={isLoading}
            >
                📷 Scan with Camera
            </button>
            
            <p style={{ margin: '15px 0' }}>This is the fastest, most reliable way to verify your product.</p>

            {/* --- 3. THE "CONFIRM" MODAL --- */}
            {/* This only appears when showModal is true */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm AI Scan Result</h3>
                        <p>Please check the code and fix any errors.</p>
                        
                        <input 
                            type="text" 
                            className="modal-input"
                            value={scannedCode}
                            onChange={(e) => setScannedCode(e.target.value.trim())}
                        />
                        
                        <button 
                            className="modal-button-verify"
                            onClick={handleVerify}
                        >
                            Verify This Code
                        </button>
                        
                        <button 
                            className="modal-button-cancel"
                            onClick={() => setShowModal(false)} // Just close the modal
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}