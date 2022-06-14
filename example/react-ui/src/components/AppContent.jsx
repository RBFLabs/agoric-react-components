import React from 'react';

import {useAgoricWalletContext} from '@rbflabs/agoric-react-components';

import OfferMonitor from './OfferMonitor'

function AppContent() {
  const {walletConnected, purses} = useAgoricWalletContext();

  if (!walletConnected) {
    return <div>Wallet not connected</div>;
  }

  if (walletConnected && !purses) {
    return <div>Loading purses...</div>;
  }

  if (walletConnected && purses && purses.length === 0) {
    return <div>No purses in your wallet...</div>;
  }


  return (
    <div>
      <OfferMonitor />
    </div>
  );
}

export default AppContent;
