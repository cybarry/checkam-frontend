import axios from 'axios';

// Get this live URL from your Team Lead (once he deploys)
// For testing tonight, use his local IP: http://[TeamLead's_IP_Address]:3001
const API_URL = "https://checkam-backend.vercel.app/"; // <-- Use this for now

/**
 * Verifies a code against the backend
 * @param {string} code The code to verify
 * @returns {Promise} An axios promise
 */
export const verifyCode = (code) => {
    return axios.post(`${API_URL}/api/verify`, { code });
};

/**
 * Reports a code to the backend
 * @param {string} code The code to report
 * @returns {Promise} An axios promise
 */
export const reportCode = (code) => {
    return axios.post(`${API_URL}/api/report`, { code });
};