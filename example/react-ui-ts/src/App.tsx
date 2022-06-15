import React from 'react';

import {AgoricWalletConnectButton, useAgoricWalletContext} from './components/@rbflabs';
import OfferMonitor from './components/OfferMonitor';
import MintForm from './components/MintForm';

import './App.css';

function App() {
  const {walletConnected, purses} = useAgoricWalletContext();

  if (!walletConnected) {
    return (
      <div className="App">
        Wallet not connected
        <AgoricWalletConnectButton />
      </div>
    );
  }

  if (walletConnected && !purses) {
    return <div className="App">Loading purses...</div>;
  }

  if (walletConnected && purses && purses.length === 0) {
    return <div className="App">No purses in your wallet...</div>;
  }

  return (
    <div className="App">
      <MintForm />
      <OfferMonitor />
    </div>
  );
}

export default App;
