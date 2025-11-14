// src/pages/VerifiedScreen.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles.css'; 

export default function VerifiedScreen() {
    const location = useLocation();
    const { product_name, points } = location.state || { product_name: "Product", points: 0 };

    return (
        <div className="screen-container verified">
            <h1 className="icon">✅</h1>
            <h2>VERIFIED GENUINE!</h2>
            <p>Product: <strong>{product_name}</strong></p>
            <p>You've earned <strong>{points} points!</strong> 🛡️</p>
            
            {/* This is our "Smarter Faker" trap! */}
            <button className="report-button">🚩 Report a problem with this batch?</button>
            
            <Link to="/" className="scan-new-button">Scan Another</Link>
        </div>
    );
}