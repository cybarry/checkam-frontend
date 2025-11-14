// src/pages/WarningScreen.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles.css'; 

export default function WarningScreen() {
    const location = useLocation();
    const { message } = location.state || { message: "This product is not recognized." };

    return (
        <div className="screen-container warning">
            <h1 className="icon">❌</h1>
            <h2>WARNING</h2>
            <p>{message}</p>
            
            {/* Our "Phase 3" E-commerce hook */}
            <button className="buy-button">🛒 Buy a Verified Original?</button>
            
            <Link to="/" className="scan-new-button">Scan Another</Link>
        </div>
    );
}