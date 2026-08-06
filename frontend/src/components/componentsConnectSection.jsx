import React from 'react';

const CompleteSection = ({ onReset }) => {
  return (
    <div className="complete-section">
      <div className="success-icon">✅</div>
      <h2>Audit Complete!</h2>
      <div className="result-box">
        <div className="result-item">
          <span>Vulnerabilities Found:</span>
          <span className="green">0</span>
        </div>
        <div className="result-item">
          <span>Security Score:</span>
          <span className="green">100/100</span>
        </div>
        <div className="result-item">
          <span>Wallet Status:</span>
          <span className="green">Secure</span>
        </div>
      </div>
      <button onClick={onReset} className="reset-btn">
        Scan Another Wallet
      </button>
      <p className="final-disclaimer">
        <span className="lock-icon">🔒</span> Your wallet is completely safe.
        No data was stored or transmitted.
      </p>
    </div>
  );
};

export default CompleteSection;