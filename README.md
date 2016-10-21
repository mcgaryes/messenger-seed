# Chatbot Seed

This is a seed project for creating a Facebook Messenger chatbot. Detailed instructions on getting started can be found in the `SETUP.md` file in the root of this directory.

## Installation

    $ cd [PROJECT_DIRECTORY]
    $ npm install
    
## Local Development

For local development the project uses a service called [ngrok](https://ngrok.com/). This basically sets up a proxy on ngrok's servers and routes all traffic to the chatbot running locally, which makes debugging much easier.

Once ngrok is installed and you've walked through the setup instruction in the `SETUP.md` file. You can run the following command:

    $ npm run develop
    
This does a number of things...
 
+ Starts a local server running your bot (`scripts/create-tunnel`).
+ Sets up a tunnel with ngrok to route traffic through to the locally running chatbot.
+ Updates Facebook settings, found in the `scripts/setup.js` file.
