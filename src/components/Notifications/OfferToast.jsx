import React, { useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletContext from '../../contexts/WalletContext';

// custom hook for getting previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function getOfferToastProps(status) {
  switch (status) {
    case 'accept':
      return {
        text: 'was accepted!',
        autoClose: 4000,
        className: 'success',
      };
    case 'decline':
      return {
        text: 'was declined',
        autoClose: 4000,
        className: 'error',
      };
    case 'pending':
      return {
        text: 'is pending...',
        autoClose: false,
        className: 'neutral',
      };
    case 'complete':
      return {
        text: 'was completed',
        autoClose: false,
        className: 'neutral',
      };
    case undefined:
      return {
        text: 'was proposed. Accept in your wallet...',
        autoClose: false,
        className: 'neutral',
      };
    default:
      return {
        text: 'status is not recognized',
        autoClose: false,
        className: 'neutral',
      };
  }
}

function getStyles(className) {
  // this is just temporary showcase of style changes
  switch (className) {
    case 'success':
      return {
        color: 'green',
      };
    case 'error':
      return {
        color: 'red',
      };
    default:
      return {
        color: 'grey',
      };
  }
}

const getComponent = (offerId, description, className) => {
  return (
    <div style={getStyles(className)}>{`Offer #${offerId} ${description}`}</div>
  );
};

const getUpdatedOffer = (previousOffers, updatedOffers) => {
  /**
   * This function compared old and new offers arrays and returns updated offer
   * The change can be: 
   * 1. either new offer was added
   * 2. status of some existing offer was changed
   */

  if (previousOffers === undefined || updatedOffers === undefined) return null;

  const previousLength = previousOffers.length;
  const updatedLength = updatedOffers.length;

  // This probably should not happen. If it does throw error and investigate why
  if (updatedLength < previousLength) {
    throw Error('afterLength < beforeLength');
  }

  // New offer was added
  else if (updatedLength > previousLength) {
    if (updatedLength - previousLength > 1) {
      // Updated offers should have the same size as previous offers or be by just 1 element larger
      // However, updated offers can by larger by more than 1 element on page reload, because all previous offers will get deleted
      // We don't show any notifications in that scenario
      console.warn('1. updatedLength - previousLength > 1');
      console.warn('2. previousOffers: ', previousOffers);
      console.warn('3. updatedOffers: ', updatedOffers);
      return null;
    }
    // return the last offer (that one was added)
    return updatedOffers[updatedOffers.length - 1];
  }

  // Find the offer whose status has changed
  else if (updatedLength === previousLength) {
    for (let i = 0; i < updatedLength; i++) {
      if (previousOffers[i].status !== updatedOffers[i].status)
        return updatedOffers[i];
    }
  }

  return null;
};

function OfferToast() {
  const { offers } = useContext(WalletContext);
  const prevOffers = usePrevious(offers);

  const properties = {
    position: 'bottom-left',
    closeOnClick: true,
    newestOnTop: true,
    draggable: false,
    containerId: 'Wallet',
    hideProgressBar: false,
    autoClose: false,
  };

  useEffect(() => {
    const updatedOffer = getUpdatedOffer(prevOffers, offers);

    if (updatedOffer) {
      const { id, status } = updatedOffer;
      const { text, autoClose, className } = getOfferToastProps(status);

      if (toast.isActive(id)) {
        toast.update(id, {
          ...properties,
          autoClose,
          render: () => getComponent(id, text, className),
        });
      } else {
        // create a new toast for this offer
        toast(getComponent(id, text, className), {
          ...properties,
          toastId: id,
          autoClose,
        });
      }
    }
  }, [offers]);
  return <></>;
}

export default OfferToast;
