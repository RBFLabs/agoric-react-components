/* global harden */
import React, {useState, useEffect, useMemo} from 'react';
import {E} from '@agoric/eventual-send';
import {useAgoricWallet} from '@rbflabs/agoric-react-components';
import appConstants from '../dAppConstants.mjs';
import {makeNatAmountInput} from '@agoric/ui-components';
import {TextField} from '@material-ui/core';

const MintForm = () => {
  const [amount, setAmount] = useState(0n);
  const [moolaPursePetname, setMoolaPursePetname] = useState(undefined);

  const {purses, zoe, board, walletBridge} = useAgoricWallet();

  const NatAmountInput = useMemo(() => makeNatAmountInput({React, TextField: TextField}), []);

  useEffect(() => {
    E(walletBridge).suggestIssuer('Moola', appConstants.TOKEN_ISSUER_BOARD_ID);
    E(walletBridge).suggestInstallation('Moola installation', appConstants.INSTALLATION_BOARD_ID);
    E(walletBridge).suggestInstance('Moola Instance', appConstants.INSTANCE_BOARD_ID);
  }, [walletBridge]);

  useEffect(() => {
    if (purses) {
      const tokenPurse = purses.find(
        // Does the purse's brand match our token brand?
        ({brandBoardId}) => brandBoardId === appConstants.TOKEN_BRAND_BOARD_ID
      );
      if (tokenPurse && tokenPurse.pursePetname) {
        // If we got a petname for that purse, use it in the offers we create.
        console.log(`found purse name ${tokenPurse.pursePetname}`);
        setMoolaPursePetname(tokenPurse.pursePetname);
      }
    }
  }, [purses]);

  const mintSomeMoola = async () => {
    console.log('mintMoola handler running');
    const moolaInstance = await E(board).getValue(appConstants.INSTANCE_BOARD_ID);
    const moolaPublicFacet = await E(zoe).getPublicFacet(moolaInstance);
    const mintInvitation = await E(moolaPublicFacet).makeMintInvitation();

    const offerConfig = harden({
      id: `${Date.now()}`,
      invitation: mintInvitation,
      proposalTemplate: {
        want: {
          Tokens: {
            pursePetname: moolaPursePetname,
            value: amount,
          },
        },
      },
      dappContext: true,
    });

    console.log('adding offer to mint Moolas');
    await E(walletBridge).addOffer(offerConfig);
  };

  return (
    <div className="MintForm">
      <label>Amount of Moola to mint:</label>
      {/* <input type="text" pattern="[0-9]*" onChange={ev => setAmount(parseInt(ev.target.value) || 0)} value={amount} /> */}
      <NatAmountInput value={amount} onChange={(ev: any) => setAmount(ev)} decimalPlaces={0} />
      <button onClick={() => mintSomeMoola()}>Get some Moola!</button>
    </div>
  );
};

export default MintForm;
