import {AgoricWalletState} from '../../model';
import {AgoricNotificationType} from './AgoricNotificationType';

export function getConnectNotificationData(walletState: AgoricWalletState) {
  switch (walletState) {
    case AgoricWalletState.Connecting:
    case AgoricWalletState.Locating:
    case AgoricWalletState.Idle:
      return {
        text: 'Connecting to your wallet...',
      };
    case AgoricWalletState.Approving:
      return {
        text: 'Approve dApp in your wallet...',
      };
    case AgoricWalletState.Bridged:
      return {
        autoClose: 4000,
        text: 'Wallet Connected',
        type: AgoricNotificationType.Success,
      };
    default:
      // Just for debugging
      return {
        text: `Undefined wallet state: ${walletState}`,
      };
  }
}
