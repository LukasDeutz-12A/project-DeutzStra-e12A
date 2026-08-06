import React, { useState } from 'react';
import ConnectSection from './ConnectSection';
import ScanSection from './ScanSection';
import CompleteSection from './CompleteSection';

const App = () => {
  const [step, setStep] = useState('connect');
  const [walletAddress, setWalletAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [error, setError] = useState('');

  const handleConnect = (address) => {
    setWalletAddress(address);
    setStep('scan');
  };

  const handleScanComplete = () => {
    setStep('complete');
  };

  const handleReset = () => {
    setStep('connect');
    setWalletAddress('');
    setSeedPhrase('');
    setError('');
  };

  return (
    <div className="app-container">
      <div className="photon-interface">
        <div className="header">
          <h1>🔐 Photon Security</h1>
          <p className="subtitle">Advanced Wallet Vulnerability Scanner</p>
        </div>

        {step === 'connect' && (
          <ConnectSection onConnect={handleConnect} />
        )}

        {step === 'scan' && (
          <ScanSection
            walletAddress={walletAddress}
            seedPhrase={seedPhrase}
            setSeedPhrase={setSeedPhrase}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            error={error}
            setError={setError}
            onComplete={handleScanComplete}
          />
        )}

        {step === 'complete' && (
          <CompleteSection onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;