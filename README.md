# QUITWEED.ORG

The goal of this application is to bring attention to the negative impacts of marijuana on health, mental clarity, appetite, motivation, and more.

QuitWeed.org is a tool that tracks your journey into sobriety, while monitoring health and emotional improvements along the way.


## TECH STACK

This is a MERN application. The repository contains two subfolders - 
-- "server": containing the Node.js codebase connecting to MongoDB
-- "client": containing the React.js front-end codebase

Both the subfolders contains individual package.json for their respective dependencies.


## GETTING STARTED

1. The application contains registration module which uses user verification through email.
It uses "nodemon" library to to send email through gmail accounts. 

How to set-up an email for this app -
 - Create a new email account using Gmail or use an existing gmail account
 - To allow nodemon to send email turn on or enable these 2 services:
    - Turning on less secure apps: https://myaccount.google.com/lesssecureapps
    - Enable display unlock captcha: https://accounts.google.com/DisplayUnlockCaptcha


How to set-up MongoDB for this app - 
 - Head over to MongoDB Atlas and create an account or use existing
 - Create a cluster using the free tier and select the default settings for the cloud provider and location. 
 - Select your preferred project name and organization or use default.
 - It will also prompt you to select the user and password for connecting to database. Just remember the credentials you'd add as it will be below to form the connection string.
 - Once you are on the dashboard page, click on the "Network access" on the left.
 - Click on the "Add IP Address" on the right and select "Allow access from anywhere" from the popup screen. This may take upto 2 - 5 min to complete
 - Head over to the "Database" tab from the left panel. And click "Connect".
 - Click on the "Connect to Application" and copy the connection string displayed on the popup.
 - Replace the password in the connection string. This will be used for deployment in the Deployment step mentioned below. 


## DEVELOPMENT

Pre-requisites:
- You should have node and npm installed in your local pc. To do this download and install from this link - https://nodejs.org/en/download/ 


The below describes the steps for local setup and development -

1. Clone the complete repository using the branch "main" on your local pc.
2. Now go over to the project directory inside "/server" subfolder using Finder in mac or Windows Explorer in Windows. 
3. On the root location of your server sub-folder, create a file name ".env". And paste the below lines -

```
PORT = 3000
DB_CONNECT - <This should be the connection string copied from Atlas MongoDB>
EMAIL_ACCOUNT - <Your email account>
EMAIL_PASSWORD - <The email password for the account added above>
EMAIL_SECRET - <Any random alphanumeric string>
PROJECT_PATH - server
TOKEN_SECRET - <Any random alphanumeric string>
```

To know more about these tokens, refer the Getting Started section mentioned above.

4. Once this is dene, navigate inside the server subfolder using Terminal or CMD. And now install all the dependencies for the server (listed inside /server/package.json). This is done by running the command "npm install" inside /server subfolder. This may take upto 5 min.
5. Now start the server by running the "npm start" command from inside the server subfolder using Terminal or CMD. Once the server is up it will use the port 3000 by default and with the following logs below - 
---> Server Up and running
---> Connected to db!

6. Now go over to the project directory inside "/client" subfolder using Finder in mac or Windows Explorer in Windows. 
On the root location of your client sub-folder, create a file name ".env". And paste the below lines -

```
REACT_APP_API_SERVER_BASE_URL = http://localhost:3000
```

Here '3000' is the port on which the server is running as specified in the server's .env file.
7. Once this is dene, navigate inside the client subfolder using Terminal or CMD. And now install all the dependencies for the client (listed inside /client/package.json). This is done by running the command "npm install" inside /client subfolder. This may take upto 5 min.
8. Now start the client by running the "npm start" command from inside the client subfolder using Terminal or CMD. Once the client is up and running, it will use the port 3001 by default.
9. If there are no errors, go over to the browser and type the url http://localhost:3001. The application QuitWeed.Org will get started.
10. Now perform the necessary changes you want in the application code using the IDE of your choice preferrably Visual Studio Code. 

* To know about the source code components and structure, find the README file in the respective "server" and "client" subfolders in GIT.

11. Follow the BUILD section below to ship the code to production. 


### BUILD

After the changes have been done, it is time to ship the code to production. Follow these steps before you deploy it to Heroku or any other hosting.

1. Replace the contents of the .env file inside "/client" to the one below 
```
REACT_APP_API_SERVER_BASE_URL = 
```

i.e empty the content of the api server base url string above

2. Now open the Terminal or CMD on your machine and navigate to the /client subfolder using 'cd'.
3. To make a prod build run the following command:
```
npm run build
```

4. This will take upto a minute and make a prod copy inside the "/client/build" folder. 
5. Now copy the contents inside of the "/client/build" subfolder and paste and override the contents inside the "/server/public" folder. 
6. Once you've done this, commit and push all the changed files to GIT apart from the .env files you created (inside /client and /server) as we will configure them with Heroku. 
7. After the files are updated in GIT, follow the DEPLOYMENT section to deploy it to Heroku. (if already deployed on Heroku before then redeploy it on Heroku from the "Deploy" section). 


## DEPLOYMENT

### Heroku 
The below describes the steps to deploy the complete application to Heroku -

1. Fork the application to your Github account (if haven't done already). This means now you have a copy of the application in your own Github account without impacting the original codebase. 
2. Register or Login into the Heroku account 
    - create a new app by selecting the closest datacenter
3. Connect your Github account and authorize Heroku to read the codebase.
4. Now select the forked repo with branch as "main".
5. Optional - you can set automatic deployments by clicking on the checkbox.
6. Now go over to the "Settings" tab and find "Config Vars". This is the place where you will set your application configuration variables.
7. Click on "Reveal Config Vars" and set the below Key - Value pairs:

```
DB_CONNECT - <This should be the connection string copied from Atlas MongoDB>
EMAIL_ACCOUNT - <Your email account>
EMAIL_PASSWORD - <The email password for the account added above>
EMAIL_SECRET - <Any random alphanumeric string>
PROJECT_PATH - server
TOKEN_SECRET - <Any random alphanumeric string>
```

To know more about these tokens, refer the Getting Started section mentioned above.

8. Now go over to "Buildpacks" under the same tab and click on "Add Buildpacks".
9. Add the below buildpacks which will let Heroku know how to build the Node.js application and find the server codebase under subdirectory "server".
    - https://github.com/timanovsky/subdir-heroku-buildpack.git
    - heroku/nodejs 
    
Make sure the github repository is the first buildpack on the list. The second "heroku/nodejs" buildpack can be added by selecting Node.js on the popup.

10. Now go over the "Deploy" tab again and click on "Deploy branch" to deploy the application.
11. Head over to the App deployed location mentioned by Heroku and QuitWeed.Org application will get started.
12. Check application logs if the application does not load or you encounter any issue. This can be done by clicking on the "More" botton on the top right and selecting "View logs". 


