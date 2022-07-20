import React from 'react';
import {useAgoricWallet} from '@rbflabs/agoric-react-components';

const PurseMonitor = () => {
  const {purses} = useAgoricWallet();

  if (!purses) return <></>;

  return (
    <div className="Monitor">
      <h3>Wallet Purses:</h3>
      <ul>
        {purses.map(purse => (
          <li key={purse.pursePetname}>
            <ul>
              <li>Purse petname: {purse.pursePetname}</li>
              <li>Purse value: {Number(purse.value)}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurseMonitor;
