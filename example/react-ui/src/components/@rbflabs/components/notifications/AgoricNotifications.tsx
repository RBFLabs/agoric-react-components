import React from 'react';
import {ToastContainer} from 'react-toastify';
import {AgoricNotificationsCloseButton} from './AgoricNotificationsCloseButton';

interface AgoricNotificationsProps {
  connect?: boolean;
  offer?: boolean;
  purse?: boolean;
}

export function AgoricNotifications(props: AgoricNotificationsProps = {}) {
  // TODO listen to state changes and show individual notifications

  return (
    <ToastContainer
      enableMultiContainer
      containerId={'AgoricNotifications'}
      closeOnClick={false}
      newestOnTop={true}
      closeButton={AgoricNotificationsCloseButton}
    ></ToastContainer>
  );
}
