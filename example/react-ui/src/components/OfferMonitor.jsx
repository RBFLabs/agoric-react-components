import React, { useContext } from 'react';
import WalletContext from '../contexts/WalletContext';

const OfferMonitor = () => {
  const { offers } = useContext(WalletContext);

  const getAcceptedOffers = (offers) => {
    return offers.filter((o) => o.status === 'accept');
  };

  const getDeclinedOffers = (offers) => {
    return offers.filter((o) => o.status === 'decline');
  };

  const getPendingOffers = (offers) => {
    return offers.filter((o) => o.status === 'pending');
  };

  const getCompletedOffers = (offers) => {
    return offers.filter((o) => o.status === 'complete');
  };

  const getProposedOffers = (offers) => {
    return offers.filter((o) => o.status === undefined);
  };

  return (
    <div>
      All wallet offers count: {offers.length}
      <ul>
        <li>Accepted: {getAcceptedOffers(offers).length}</li>
        <li>Declined: {getDeclinedOffers(offers).length}</li>
        <li>Pending: {getPendingOffers(offers).length}</li>
        <li>Proposed: {getProposedOffers(offers).length}</li>
        <li>Completed: {getCompletedOffers(offers).length}</li>
      </ul>
    </div>
  );
};

export default OfferMonitor;