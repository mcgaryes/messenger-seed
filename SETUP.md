+ Create New Facebook Page (optional).
	+ Add page id to configuration
+ Create New Facebook Application (optional).
	+ Visit https://developers.facebook.com/apps/.
	+ Add app id and app secret tp configuration.
	+ Click add product and choose messenger
	+ Generate a page access token by selecting the page from step 1
	+ Add token to config
	+ Run command npm run develop
	+ Copy the link of the webpage that is opened
	+ Click add product and choose webhooks
	+ Create a new subscripttion for page
	+ Select subscription fields messages, message_optins, and messaging postbacks
	+ Enter the url from above plus /webhook in the callback url field (e.g. https://574b37a5.ngrok.io/webhook)
	+ Create a validation token and add it to the configration file 
	+ In the webhooks section choose the page created in the first step and subscribe to it
	+ Get the app access token at https://developers.facebook.com/tools/access_token/
+ Now goto wit.ai and create a new application
+ Goto settings and grab the access token and app id and place them in the config file
+ Create a new story and name it Hello, Chatbot
	+ User says hello chatbot
	+ Create intent for hello
	+ Bot executes sayHello
+ Test bot
	+ Goto the address of the page opened earlier with the ngrok address
	+ Click 'Message Us' and then type 'Hello' in the message input.
