import React, { useMemo } from 'react'
import { useAgoricWallet } from '@rbflabs/agoric-react-components';

const AgoricWalletConnectButton = () => {
  const { connectWallet, walletState } = useAgoricWallet()

  const { disabled, children } = useMemo(() => {
    switch (walletState) {
      case 'locating':
      case 'connecting':
        return {
          disabled: true,
          children: 'Connecting…',
        };
      case 'approving':
        return {
          disabled: true,
          children: 'Approving…',
        };
      case 'bridged':
        return {
          disabled: true,
          children: 'Connected!',
        };
      // also for idle
      default:
        return {
          disabled: false,
          children: 'Connect Wallet',
        };
    }
  }, [walletState])

  return <button type="button" disabled={disabled} onClick={connectWallet}>{children}</button>
}

export default AgoricWalletConnectButton