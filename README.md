# Consult-Match
The consult-match platform is developed as an example of how blockchain technology can be used in practice.

The platform consists of:
1. The ability for employers to post jobs.
2. The ability for consultants to publish their profile.

Then people can browse jobs and possible get in contact with employers. And employers can browse consultant profiles and get in contact if they find a good match.

## Technology
Truffle is used for contract deployment etc.

Jobs and consultant data is saved in Swarm with a link on the Ethereum blockchain.
The Ethereum blockchain is also used for storing job status, for letting the job owner change the status of a job and for consultants to delete their profile.

For the frontend React, Redux, Material-UI, and Typescript are used. 

## How to run
### Run develop blockchain and deploy contracts
```
$ npm run eth-dev
```
Then in the console deploy the contracts with the `deploy` keyword.

### Run the web-app
This must be done after the contracts are deployed.
```
$ npm app-start
```

## Deployment to Ropsten via Infura
### Configure
1. First rename the `secret.json-template` file to `secret.json`. 
2. Create an account at at infura.io.
3. Create a project at infura.io.
4. Copy the API KEY and the API SECRET to the corresponding fields in the secret.json file.

### Deploy
```
$ npm run eth-deploy:ropsten-infura
```

## Build the web-app
```
$ npm app-build
```

*Created by Hallingdata AS*
