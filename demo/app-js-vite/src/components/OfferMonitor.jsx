import React from 'react';
import { useOffers } from '../hooks';

const OfferMonitor = () => {
  const allOffers = useOffers();
  const acceptedOffers = useOffers('accepted');
  const declinedOffers = useOffers('declined');
  const pendingOffers = useOffers('pending');
  const completedOffers = useOffers('completed');
  const proposedOffers = useOffers('proposed');

  return (
    <div className="Monitor">
      <h3>Wallet Offers:</h3>
      <ul>
        <li>All wallet offers: {allOffers.length}</li>
        <li>Accepted: {acceptedOffers.length}</li>
        <li>Declined: {declinedOffers.length}</li>
        <li>Pending: {pendingOffers.length}</li>
        <li>Proposed: {proposedOffers.length}</li>
        <li>Completed: {completedOffers.length}</li>
      </ul>
      <hr />
      <ul>
        {allOffers.map(offer => (
          <li key={offer.id}>
            <ul>
              <li>ID: {offer.id}</li>
              <li>Description: {offer.invitationDetails.description}</li>
              <li>Status: {offer.status}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferMonitor;
