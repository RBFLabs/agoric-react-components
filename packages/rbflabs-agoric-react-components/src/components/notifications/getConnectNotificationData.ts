import {AgoricWalletState} from '../../model';
import {AgoricNotificationsToastType} from './AgoricNotificationsToastType';
import {ToastOptions} from 'react-toastify';

export function getConnectNotificationData(walletState: AgoricWalletState): {
  autoClose: ToastOptions['autoClose'];
  text: string;
  type: AgoricNotificationsToastType;
} {
  switch (walletState) {
    case AgoricWalletState.Connecting:
    case AgoricWalletState.Locating:
    case AgoricWalletState.Idle:
      return {
        autoClose: false,
        text: 'Connecting to your wallet...',
        type: AgoricNotificationsToastType.Info,
      };
    case AgoricWalletState.Approving:
      return {
        autoClose: false,
        text: 'Approve dApp in your wallet...',
        type: AgoricNotificationsToastType.Info,
      };
    case AgoricWalletState.Bridged:
      return {
        autoClose: 4000,
        text: 'Wallet Connected',
        type: AgoricNotificationsToastType.Success,
      };
    default:
      // Just for debugging
      return {
        autoClose: 4000,
        text: `Undefined wallet state: ${walletState}`,
        type: AgoricNotificationsToastType.Info,
      };
  }
}
