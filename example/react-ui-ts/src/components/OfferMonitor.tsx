import React from 'react';
import {useAgoricWalletContext} from './@rbflabs';

const OfferMonitor = () => {
  // TODO create hooks to return these offers
  const {offers} = useAgoricWalletContext();

  const getAcceptedOffers = (offers:any) => {
    return offers.filter((o: any) => o.status === 'accept');
  };

  const getDeclinedOffers = (offers:any) => {
    return offers.filter((o: any) => o.status === 'decline');
  };

  const getPendingOffers = (offers:any) => {
    return offers.filter((o: any) => o.status === 'pending');
  };

  const getCompletedOffers = (offers:any) => {
    return offers.filter((o: any) => o.status === 'complete');
  };

  const getProposedOffers = (offers:any) => {
    return offers.filter((o: any) => o.status === undefined);
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
