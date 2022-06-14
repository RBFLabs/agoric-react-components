/* global harden */
import React, { useContext, useState } from 'react';
import { E } from '@agoric/eventual-send';
import WalletContext from '../contexts/WalletContext';
import format from '../utils/format';
import { multiplyBLD } from '../utils/ratio';
import Spinner from './Spinner';
import theme from '../theme';

import {
  AgoricLogoWrapper,
  MaxButton,
  YourBalance,
  StakeButton,
  InputLogoWrapper,
  Input,
  InputAreaWrapper,
  BalanceAmount,
} from './SBLDMintingForm';

const SBLDBurningForm = (props) => {
  const [amount, setAmount] = useState(0);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    sBLDRatio,
    BLDPurse,
    sBLDPurse,
    walletBridge,
    publicFacet,
  } = useContext(WalletContext);

  const burn = async () => {
    setLoading(true);
    const burnInvitation = await E(publicFacet).makeBurn();

    const offerConfig = harden({
      id: `${Date.now()}`,
      invitation: burnInvitation,
      proposalTemplate: {
        want: {
          BLD: {
            pursePetname: BLDPurse.pursePetname,
            value: Math.floor(
              (multiplyBLD(format.valueToNat(amount, 6), sBLDRatio) * 97) / 100,
            ),
          },
        },
        give: {
          SBLD: {
            pursePetname: sBLDPurse.pursePetname,
            value: format.valueToNat(amount, 6),
          },
        },
      },
      dappContext: true,
    });
    const newOffer = await E(walletBridge).addOffer(offerConfig);
    setOffers([newOffer, ...offers]);
    setLoading(false);
  };

  const redeemDisabled = sBLDPurse ? Number(sBLDPurse.value) === 0 : true;

  return (
    <div>
      <InputAreaWrapper>
        <YourBalance>
          You have
          <BalanceAmount>
            {redeemDisabled ? 0 : format.natToValue(sBLDPurse.value, 6)}
          </BalanceAmount>
          sBLD
          <MaxButton
            onClick={() => setAmount(format.natToValue(sBLDPurse.value, 6))}
            disabled={redeemDisabled}
          >
            Max
          </MaxButton>
        </YourBalance>
        <InputLogoWrapper>
          <AgoricLogoWrapper disabled={redeemDisabled}>sBLD</AgoricLogoWrapper>
          <Input
            type="text"
            pattern="[0-9]*"
            id="mintInput"
            onChange={(ev) => setAmount(parseInt(ev.target.value) || 0)}
            value={amount}
          />
        </InputLogoWrapper>
      </InputAreaWrapper>
      <StakeButton onClick={() => burn()} disabled={redeemDisabled || loading}>
        {loading ? (
          <>
            <Spinner size={16} color={theme.colors.white} />
            <div style={{ marginLeft: '8px', marginTop: '2px' }}>
              Creating Offer...
            </div>
          </>
        ) : (
          'Burn'
        )}
      </StakeButton>
    </div>
  );
};

export default SBLDBurningForm;
