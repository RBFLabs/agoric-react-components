import { WalletNotification, WalletOfferStatus, WalletState } from '../../types';

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

export function getOfferNotification(
  offerId: number,
  status?: WalletOfferStatus
): Pick<WalletNotification, 'title' | 'message' | 'loading' | 'severity'> {
  switch (status) {
    case 'accept':
      return {
        title: `Offer #${offerId}`,
        message: 'Offer was accepted!',
        loading: false,
        severity: 'success',
      };
    case 'decline':
      return {
        title: `Offer #${offerId}`,
        message: 'Offer was declined.',
        loading: false,
        severity: 'error',
      };
    case 'pending':
      return {
        title: `Offer #${offerId}`,
        message: 'Offer is pending.',
        loading: true,
        severity: 'info',
      };
    case 'complete':
      return {
        title: `Offer #${offerId}`,
        message: 'Offer was completed.',
        loading: false,
        severity: 'info',
      };
    case undefined:
      return {
        title: `Offer #${offerId}`,
        message: 'Offer was proposed. Accept in your wallet.',
        loading: true,
        severity: 'info',
      };
    default:
      return {
        title: `Offer #${offerId}`,
        message: 'Offer failed',
        loading: false,
        severity: 'error',
      };
  }
}

export function getUpdatedOffer(
  previousOffers: any[] | undefined,
  updatedOffers: any[] | undefined
) {
  /**
   * This function compared old and new offers arrays and returns updated offer
   * The change can be:
   * 1. either new offer was added
   * 2. status of some existing offer was changed
   */

  if (previousOffers === undefined || updatedOffers === undefined) {
    return null;
  }

  const previousLength = previousOffers.length;
  const updatedLength = updatedOffers.length;

  // This probably should not happen. If it does throw error and investigate why
  if (updatedLength < previousLength) {
    throw Error('afterLength < beforeLength');
  } else if (updatedLength > previousLength) {
    // New offer was added
    if (updatedLength - previousLength > 1) {
      // Updated offers should have the same size as previous offers or be by just 1 element larger
      // However, updated offers can by larger by more than 1 element on page reload, because all previous offers will get deleted
      // We don't show any notifications in that scenario
      console.warn('1. updatedLength - previousLength > 1'); // eslint-disable-line no-console
      console.warn('2. previousOffers: ', previousOffers); // eslint-disable-line no-console
      console.warn('3. updatedOffers: ', updatedOffers); // eslint-disable-line no-console
      return null;
    }
    // return the last offer (that one was added)
    return updatedOffers[updatedOffers.length - 1];
  } else if (updatedLength === previousLength) {
    // Find the offer whose status has changed
    for (let i = 0; i < updatedLength; i++) {
      if (previousOffers[i].status !== updatedOffers[i].status) return updatedOffers[i];
    }
  }

  return null;
}
