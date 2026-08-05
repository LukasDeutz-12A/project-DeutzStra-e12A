import React from 'react';

const ConnectSection = ({ onConnect }) => {
  const handleConnect = () => {
    const fakeAddress = '8x2k6GjPq5nLqZtVR7w1sW9pFjkQHLmN3XzY' + 
      Math.random().toString(36).substring(2, 8);
    onConnect(fakeAddress);
  };

  return (
    <div className="connect-section">
      <div className="security-badge">
        <span className="shield">🛡️</span>
        <span>100% Secure Audit</span>
      </div>
      <button className="connect-btn" onClick={handleConnect}>
        Connect Wallet for Security Scan
      </button>
      <p className="disclaimer">
        We never store your private keys. This is a read-only security audit.
      </p>
    </div>
  );
};

export default ConnectSection;