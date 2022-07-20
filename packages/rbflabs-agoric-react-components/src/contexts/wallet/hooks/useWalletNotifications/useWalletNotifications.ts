import { useEffect, useRef } from 'react';
import { usePrevious } from '../../../../hooks';
import { keys } from '../../../../utils/object';
import { WalletNotification, WalletNotificationGroup } from '../../types';
import { useWallet } from '../useWallet';
import { getConnectNotification, getOfferNotification, getUpdatedOffer } from './utils';

function isSameNotification(a: WalletNotification, b?: WalletNotification) {
  return b && keys(a).every(key => a[key] === b[key]);
}

export function useWalletNotifications(
  callback: (notification: WalletNotification) => void,
  groups: WalletNotificationGroup[] = ['connect', 'offer', 'purse']
) {
  const { offers, walletState } = useWallet();

  const connectNotificationId = useRef('');
  const lastConnectNotification = useRef<undefined | WalletNotification>();
  const previousOffers = usePrevious(offers);
  const lastOfferNotification = useRef<undefined | WalletNotification>();

  useEffect(() => {
    if (!groups.includes('connect') || !walletState) {
      return;
    }
    if (!connectNotificationId.current) {
      connectNotificationId.current = window.crypto.randomUUID();
    }
    const notification = {
      ...getConnectNotification(walletState),
      id: connectNotificationId.current,
    };
    if (!isSameNotification(notification, lastConnectNotification.current)) {
      lastConnectNotification.current = notification;
      callback(notification);
    }
  }, [walletState]);

  useEffect(() => {
    if (!groups.includes('offer')) {
      return;
    }

    const updatedOffer = getUpdatedOffer(previousOffers, offers ?? []);
    if (updatedOffer) {
      const notification = {
        ...getOfferNotification(updatedOffer.id, updatedOffer.status),
        id: updatedOffer.id,
      };
      if (!isSameNotification(notification, lastOfferNotification.current)) {
        lastOfferNotification.current = notification;
        callback(notification);
      }
    }
  }, [offers]);
}
