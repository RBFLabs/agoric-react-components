import { WalletNotification, WalletState } from '../../../types';

export function getConnectNotification(
  walletState: WalletState
): Pick<WalletNotification, 'title' | 'message' | 'loading' | 'severity'> {
  switch (walletState) {
    case 'connecting':
    case 'locating':
    case 'idle':
      return {
        title: 'Connecting wallet',
        message: 'Locating your wallet and establishing connection.',
        loading: true,
        severity: 'info',
      };
    case 'approving':
      return {
        title: 'Approve dApp',
        message: 'Go to your wallet and approve this dApp to continue.',
        loading: true,
        severity: 'info',
      };
    case 'bridged':
      return {
        title: 'Wallet connected',
        message: 'Connection to your wallet was successfully established!',
        loading: false,
        severity: 'success',
      };
    default:
      return {
        title: 'Unknown state',
        message: `Undefined wallet state: ${walletState}`,
        loading: false,
        severity: 'error',
      };
  }
}
