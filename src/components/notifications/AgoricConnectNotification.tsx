import React, {useMemo} from 'react';
import {AgoricWalletState} from '../../model';
import {AgoricNotification} from './AgoricNotification';
import {AgoricNotificationType} from './AgoricNotificationType';

interface AgoricConnectNotificationProps {
  walletState: AgoricWalletState | null;
}

export function AgoricConnectNotification({walletState}: AgoricConnectNotificationProps) {
  const {autoClose, text, type} = useMemo(() => {
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
  }, [walletState]);

  return <AgoricNotification text={text} type={type} />;
}
