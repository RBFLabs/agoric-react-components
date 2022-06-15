import React, {useEffect} from 'react';
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import useAgoricWalletContext from '../../hooks/useAgoricWalletContext';
import {AgoricNotification} from './AgoricNotification';
import {AgoricNotificationsCloseButton} from './AgoricNotificationsCloseButton';
import {getConnectNotificationData} from './getConnectNotificationData';

const containerId = 'AgoricNotifications';

interface AgoricNotificationsProps {
  connect?: boolean;
  offer?: boolean;
  purse?: boolean;
}

export function AgoricNotifications({connect = true, offer = true, purse = true}: AgoricNotificationsProps = {}) {
  const {walletState} = useAgoricWalletContext();

  useEffect(() => {
    if (!connect || !walletState) {
      return;
    }

    const {autoClose, text, type} = getConnectNotificationData(walletState);

    const options: ToastOptions = {
      autoClose,
      containerId,
      closeOnClick: true,
      draggable: false,
      hideProgressBar: false,
      position: 'bottom-left',
    };

    toast(<AgoricNotification text={text} type={type} />, options);
  }, [connect, walletState]);

  // TODO add offer notifications

  return (
    <ToastContainer
      enableMultiContainer
      containerId={containerId}
      closeOnClick={false}
      newestOnTop={true}
      closeButton={AgoricNotificationsCloseButton}
    />
  );
}
