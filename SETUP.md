# Messenger Chatbot Setup

+ Rename `config/default.copy.json` to `config/default.json`.
+ Facebook Page
    + Create New Facebook Page (optional).
    + Add `pageId` to the configuration file.
+ Facebook Application
    + Create New Facebook Application (optional).
    + Visit [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/).
    + Add `appId` and `appSecret` to the configuration file.
+ Setup Messenger Product
    + Click *add product* and choose *messenger*.
    + Generate a `pageAccessToken` by selecting the page from step 1.
    + Add the `pageAccessToken` to the configuration file.
+ Start the chatbot
    + Run the command `npm run develop`.
    + The previous line should open a new webpage. Copy the link of the webpage that is opened and head back to [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/).
+ Setup a webhook
    + Click add product and choose webhooks
    + Create a new subscripttion for page
    + Select subscription fields messages, message_optins, and messaging postbacks
    + Enter the url from above plus /webhook in the callback url field (e.g. https://574b37a5.ngrok.io/webhook)
    + Create a `validationToken` and add it to the configration file 
+ In the *webhooks* section choose the page created in the first step and subscribe to it
+ Get the app access token at [https://developers.facebook.com/tools/access_token/](https://developers.facebook.com/tools/access_token/) and add it to the configuration file.
+ Create wit.ai application.
    + Now goto [https://wit.ai/](https://wit.ai/) and create a new application.
    + Goto to the wit.ai settings page and add the `accessToken` and `appId` to the configuration file.
    + Create a new story and name it *Hello, Chatbot*.
    + User says *hello*.
    + Create *intent* for *hello*
    + Bot executes *sayHello* function.
+ Test the chatbot.
    + Goto the address of the page opened earlier with the ngrok address (e.g. https://574b37a5.ngrok.io/webhook).
    + Click *Message Us* and then type *Hello* in the message input.
