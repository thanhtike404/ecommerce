import './loading.css';

import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Optional: Use any spinner icon from react-icons
function Loading() {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <FaSpinner className="spinner-icon" />
      </div>
    </div>
  );
}

export default Loading;
