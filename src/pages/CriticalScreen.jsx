import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles.css'; // Make sure you have this CSS file

export default function CriticalScreen() {
    // useLocation hook gets the "state" we passed from the navigate() function
    const location = useLocation();
    
    // Get the "message" from the state, or show a default message if state is empty
    const { message } = location.state || { message: "This product is high risk." };

    return (
        <div className="screen-container critical">
            <h1 className="icon">🚨</h1>
            <h2>CRITICAL WARNING</h2>
            
            {/* This displays the specific error (e.g., "Replay Attack" or "Reported") */}
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{message}</p>
            
            <p style={{ marginTop: '10px' }}><strong>DO NOT USE THIS PRODUCT.</strong></p>
            
            {/* This is our "Phase 3" E-commerce hook */}
            <button className="buy-button">🛒 Buy a Verified Original?</button>
            
            <Link to="/" className="scan-new-button">Scan Another</Link>
        </div>
    );
}