import {AgoricOfferStatus} from '../../model/AgoricOfferStatus';
import {AgoricNotificationsToastType} from './AgoricNotificationsToastType';
import {ToastOptions} from 'react-toastify';

function createOfferNotificationText(offerId: number, message: string): string {
  return `Offer #${offerId} ${message}`;
}

export function getOfferNotificationData(
  offerId: number,
  status: AgoricOfferStatus | undefined
): {
  autoClose: ToastOptions['autoClose'];
  text: string;
  type: AgoricNotificationsToastType;
} {
  switch (status) {
    case AgoricOfferStatus.Accept:
      return {
        autoClose: 4000,
        text: createOfferNotificationText(offerId, 'was accepted!'),
        type: AgoricNotificationsToastType.Success,
      };
    case AgoricOfferStatus.Decline:
      return {
        autoClose: 4000,
        text: createOfferNotificationText(offerId, 'was declined'),
        type: AgoricNotificationsToastType.Error,
      };
    case AgoricOfferStatus.Pending:
      return {
        autoClose: false,
        text: createOfferNotificationText(offerId, 'is pending...'),
        type: AgoricNotificationsToastType.Info,
      };
    case AgoricOfferStatus.Complete:
      return {
        autoClose: false,
        text: createOfferNotificationText(offerId, 'was completed'),
        type: AgoricNotificationsToastType.Info,
      };
    case undefined:
      return {
        autoClose: false,
        text: createOfferNotificationText(offerId, 'was proposed. Accept in your wallet...'),
        type: AgoricNotificationsToastType.Info,
      };
    default:
      return {
        autoClose: false,
        text: createOfferNotificationText(offerId, 'failed'),
        type: AgoricNotificationsToastType.Error,
      };
  }
}
