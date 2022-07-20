import {WalletNotification, WalletOfferStatus} from '../../../types';

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
