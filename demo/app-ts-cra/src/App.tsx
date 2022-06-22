import React from 'react';
import './App.css';
import MintForm from './components/MintForm';

function App() {
  return (
    <div className="App">
      <h3>TypeScript React App</h3>
      <div className="App-header">
        {/* <div id="WalletState">Wallet State: {walletState || 'none'}</div>
        <AgoricWalletConnectButton /> */}
      </div>
      <MintForm />
      {/* {content} */}
    </div>
  );
}

export default App;
