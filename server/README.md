## QUITWEED.ORG

This subfolder contains the server built over Node.js and connecting to MongoDB. 

## MODULES

The source code is broken down into multiple modules.

### MODEL
This folder contains the database model used for storing data inside the MongoDB like User, Profile and DailyLog.

### PUBLIC
This folder contains the production build of the client which loads when you open the application on the browser.

### ROUTER
It contains the routes which handle all the api calls from the client and retreive or store information in the MongoDB.
1. auth.js: Contains the api calls for login and registration. It also contains the send email function which is send through nodemon library. 
2. dailyLog.js: Contains the api calls to handle dailyLog retreival and storage.
3. profile.js: Contains the api calls to handle profile retreival and storage.
4. verifyToken.js: It authenticates the user based on the jwt token sent from the client.

5. index.js: This is the first file which loads when you load the server. It initializes the main server, connects to mongodb, inits middleware and different routes. 