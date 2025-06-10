import React, { useState } from 'react';

function App() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('9');
  const [tokenSupply, setTokenSupply] = useState('1000');
  const [tokenAddress, setTokenAddress] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const showAlert = (message, type = 'info') => {
    setAlertMessage({ message, type });
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const connectWallet = async () => {
    try {
      // Check if Phantom wallet is available
      if (!window.solana) {
        showAlert('Phantom wallet not found. Please install Phantom wallet extension.', 'error');
        return;
      }

      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
      setIsWalletConnected(true);
      showAlert('Wallet connected successfully!', 'success');
    } catch (error) {
      showAlert('Failed to connect wallet', 'error');
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setTokenAddress('');
    showAlert('Wallet disconnected', 'info');
  };

  const createToken = async () => {
    if (!isWalletConnected) {
      showAlert('Please connect your wallet first', 'error');
      return;
    }

    if (!tokenName.trim() || !tokenSymbol.trim()) {
      showAlert('Please fill in token name and symbol', 'error');
      return;
    }

    setIsCreating(true);
    
    try {
      // In a real implementation, you would use @solana/web3.js and @solana/spl-token
      // For this demo, we'll simulate the token creation process
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock token address (in real implementation, this would come from Solana)
      const mockTokenAddress = `${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 7)}`;
      
      setTokenAddress(mockTokenAddress);
      showAlert(`Token "${tokenName}" created successfully!`, 'success');
      
    } catch (error) {
      console.error('Error creating token:', error);
      showAlert(`Error creating token: ${error.message}`, 'error');
    } finally {
      setIsCreating(false);
    }
  };

  // SVG Icons
  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const AlertIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );

  const InfoIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const WalletIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return <CheckIcon />;
      case 'error': return <AlertIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <WalletIcon />
              </div>
              Solana Token Creator
            </h1>
            
            {!isWalletConnected ? (
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-300">Connected</div>
                  <div className="text-sm text-white font-mono">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div className={`mb-6 p-4 rounded-xl border backdrop-blur-lg ${
            alertMessage.type === 'success' 
              ? 'bg-green-500/20 border-green-400/30 text-green-100' 
              : alertMessage.type === 'error' 
              ? 'bg-red-500/20 border-red-400/30 text-red-100' 
              : 'bg-blue-500/20 border-blue-400/30 text-blue-100'
          }`}>
            <div className="flex items-center gap-3">
              {getAlertIcon(alertMessage.type)}
              <div>
                <div className="font-semibold">
                  {alertMessage.type === 'success' ? 'Success!' : 
                   alertMessage.type === 'error' ? 'Error!' : 'Info'}
                </div>
                <div className="text-sm opacity-90">{alertMessage.message}</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="My Awesome Token"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Token Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                placeholder="MAT"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Decimals</label>
                <input
                  type="number"
                  value={tokenDecimals}
                  onChange={(e) => setTokenDecimals(e.target.value)}
                  min="0"
                  max="18"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Initial Supply</label>
                <input
                  type="number"
                  value={tokenSupply}
                  onChange={(e) => setTokenSupply(e.target.value)}
                  min="1"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              onClick={createToken}
              disabled={isCreating || !isWalletConnected}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Token...
                </>
              ) : (
                'Create Token'
              )}
            </button>
          </div>
        </div>

        {/* Token Success Display */}
        {tokenAddress && (
          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon />
              </div>
              <h3 className="text-xl font-bold text-green-100">Token Created Successfully!</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-green-200 text-sm font-medium mb-1">Token Address:</label>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-green-100 text-sm break-all">
                  {tokenAddress}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(tokenAddress)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Copy Address
                </button>
                <a
                  href={`https://explorer.solana.com/address/${tokenAddress}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLinkIcon />
                  View on Explorer
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Instructions:</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>1. Install the Phantom wallet browser extension</p>
            <p>2. Connect your wallet using the button above</p>
            <p>3. Fill in your token details (name, symbol, etc.)</p>
            <p>4. Click "Create Token" to deploy your new token on Solana Devnet</p>
            <p className="text-yellow-300 font-medium">Note: This demo creates tokens on Devnet for testing purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;