# Agoric React App Demo

`app-js` is a dApp that interacts with a contract in `contract` folder using `@rbflabs/agoric-react-components`. The dApp allows you to to connect to your Agoric wallet and mint Moola tokens.

## Prerequisites
Install Agoric SDK from 

## Run the app 

Make sure you are in the root of `demo` folder at the start of each of the following steps:

### 1. Run local Agoric chain 
- Open terminal #1 and run
- `cd agoric`
- `agoric install`
- `agoric start --reset`

### 2. Open Agoric wallet in your browser
- When the chain is running, open terminal #2 and run
- `cd agoric`
- `agoric open`

### 3. Deploy contract
- `cd agoric/contract`
- `yarn install`
- `agoric deploy deploy.js`

### 4. Run React app
- Open terminal #3 and run
- `cd ..` (now you should be at the root of all GitHub repo)
- `yarn dev`