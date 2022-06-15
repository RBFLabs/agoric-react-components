import {AgoricOfferStatus} from '../../model/AgoricOfferStatus';
import {AgoricNotificationsToastType} from './AgoricNotificationsToastType';

function createOfferNotificationText(offerId: number, message: string): string {
  return `Offer #${offerId} ${message}`;
}

export function getOfferNotificationData(offerId: number, status: AgoricOfferStatus | undefined) {
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
        text: createOfferNotificationText(offerId, 'is pending...'),
        type: AgoricNotificationsToastType.Info,
      };
    case AgoricOfferStatus.Complete:
      return {
        text: createOfferNotificationText(offerId, 'was completed'),
        type: AgoricNotificationsToastType.Info,
      };
    case undefined:
      return {
        text: createOfferNotificationText(offerId, 'was proposed. Accept in your wallet...'),
        type: AgoricNotificationsToastType.Info,
      };
    default:
      return {
        text: createOfferNotificationText(offerId, 'failed'),
        type: AgoricNotificationsToastType.Error,
      };
  }
}
