import './App.css';
import {useAgoricWallet} from '@rbflabs/agoric-react-components';
import AgoricWalletConnectButton from './components/AgoricWalletConnectButton';
import OfferMonitor from './components/OfferMonitor';
import PurseMonitor from './components/PurseMonitor';
import MintForm from './components/MintForm';
// import { NatAmountInput } from '@agoric/ui-components';

function App() {
  const {walletConnected, purses, walletState} = useAgoricWallet();

  let content;

  if (!walletConnected) {
    content = <h2>Hello, welcome to Agoric React Demo. Connect your wallet to continue!</h2>;
  } else if (walletConnected && !purses) {
    content = 'Loading purses...';
  } else if (walletConnected && purses && purses.length === 0) {
    content = 'No purses in your wallet...';
  } else {
    content = (
      <>
        <MintForm />
        <OfferMonitor />
        <PurseMonitor />
      </>
    );
  }

  return (
    <div className="App">
      <h3>TypeScript Vite App</h3>
      <div className="App-header">
        <div id="WalletState">Wallet State: {walletState || 'none'}</div>
        <AgoricWalletConnectButton />
      </div>
      {content}
    </div>
  );
}

export default App;
