# Parafin Assignment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with some modification to make the packages lighter and more compliant with libraries that have fallen out of sync from the original bundled toolchain.

On the backend, I'm using Fastify with `node-fetch` to handle any requests and `dotenv` to handle building requests from environment secrets.

## `api_requests` / Postman API Requests Used

Included, I've exported the Postman API requests that I used in my example video. I censored the private key information, but everything else is the same as it was in the accompanying video for replicability!

# Installation And Running

## 1. Clone this repo

```
> git clone https://github.com/mfukano/Parafin-GrubDash.git
> cd Parafin-GrubDash 
> npm install
```

## 2. Input API Keys into .env file

You can find the API keys in the Settings > API keys in the Parafin dashboard and grab the sandbox Client ID and Client Secret there.

In my `.env` file for this project, the fields I used are as follows:
```
PARAFIN_CLIENT_ID="<pf_client_id>"
PARAFIN_CLIENT_SECRET="<pf_client_secret>"
PORT="8000"
```

Since this doesn't ship with a .env file to retain secrecy of my keys, please paste the above into a `.env` file that you create within this project after cloning.

## 3. Generate Relevant Parafin Entities

There are a few ways of managing this for replication:
- Creating business, person, and bank account entities via cURL on command line
- Importing the Postman collection `json` from the `api_requests/` directory of this repository into Postman

Either way, these are the most important steps to obtaining valid information to input into the `person_id` field on this webapp.

## 4. Running the app

You can use the following command to get everything running (since we have a front-end and a server to manage, I'm using the `concurrently` package to bootstrap both of them).

You can use the command `npm run dev` to get things started (and hopefully everything works)!

You can find the front-end at http://localhost:3000 (which then proxies into http://localhost:8000 to make any requests without needing to input this location into the API path requested by the front-end).
