+ Create New Facebook Page (optional).
	+ Add page id to configuration

+ Create New Facebook Application (optional).
	+ https://developers.facebook.com/apps/
	+ Add app id and app secret tp configuration.
	+ Click add product and choose messenger
	+ generate a page access token by selecting the page from step 1
	+ add token to config
	+ run command npm run develop
	+ copty the link of the webpage that is opened
	+ click add product and choose webhooks
	+ create a new subscripttion for page
	+ select subscription fields messages, message_optins, and messaging postbacks
	+ enter the url from above plus /webhook in the callback url field (e.g. https://574b37a5.ngrok.io/webhook)
	+ create a validation token and add it to the configration file 
	+ in the webhooks section choose the page created in the first step and subscribe to it
	+ get the app access token at https://developers.facebook.com/tools/access_token/

+ Now goto wit.ai and create a new application
+ goto settings and grab the access token and app id and place them in the config file
+ create a new story and name it Hello, Chatbot
+ user says hello chatbot
+ create intent for hello
+ bot executes sayHello


+ test bot
+ goto the address of the page opened earlier with the ngrok address