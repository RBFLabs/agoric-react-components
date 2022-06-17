# Agoric React App Demo

`app-js` is a dApp that interacts with a contract in `contract` folder using `@rbflabs/agoric-react-components`. The dApp allows you to to connect to your Agoric wallet and mint Moola tokens.

## Prerequisites
Install Agoric SDK from [Agoric repository](https://github.com/Agoric/Agoric-sdk) by executing the following steps:

```bash
node --version # 14.15.0 or higher
npm install --global yarn
git clone https://github.com/Agoric/agoric-sdk
cd agoric-sdk
yarn install
yarn build
yarn link-cli ~/bin/agoric
agoric --version
# 0.16.0 or higher should be printed out
```

For more detail check the Agoric  [documentation](https://agoric.com/documentation/getting-started/before-using-agoric.html).


## Run the app 

Make sure you are in the root of `demo` folder at the start of each of the following steps:

### 1. Run local Agoric chain 
- Open terminal #1 and run
- `cd demo/agoric`
- `agoric install`
- `agoric start --reset`

There will be several log messages printed out. Wait until the message
```
Deployed Wallet!
```
is printed out.

### 2. Open Agoric wallet in your browser
- When the chain is running, open terminal #2 and run
- `cd demo/agoric`
- `agoric open`

This will open up a new browser tab with the Agoric wallet.

### 3. Deploy contract
- `agoric deploy contract/deploy.js`

After successful completion, the deployment script should print out a message that looks like the following:

```
- SUCCESS! contract code installed on Zoe
-- Contract Name: moolaMinter
-- Installation Board Id: board02021
-- Instance Board Id: board01422
-- Token Issuer Board Id: board04719
-- Token Brand Board Id: board06120
writing .../demo/app-js/src/dAppConstants.mjs
```


### 4. Run React app
- Open terminal #3 and run
- `cd demo/app-js` (now you should be at the root of all GitHub repo)
- `yarn`
- `yarn dev`

