# CampFinder Complete Project

Create the backend for a bootcamp directory website. The frontend/UI is Created Using React with Redux for state management. All of the functionality below needs to be fully implmented in this project.

## Project is deployed on:

-  https://camp-finder-app.herokuapp.com/

## To Run This Project On Your System

### Setup Config file

-  Clone this repo
-  Create config folder in PWD and add all ENV variable in config.env file
   -  NODE_ENV=development
   -  MONGO_URI
   -  PORT=5000
   -  PROVIDER 'geocoder provider and api key'
   -  API_KEY
   -  UPLOAD_MAX_SIZE=1000000
   -  UPLOAD_PATH=./server/public/uploads
   -  JWT_SECRET
   -  JWT_EXPIRE_IN=30d
   -  JWT_Cookie_Expire=30
   -  For Password Recovery using gmail api
      -  EMAIL
      -  REFRESH_TOKEN
      -  CLIENT_SECRET
      -  CLIENT_ID

### Run Followind script

-  node seeder -i 'to add raw data to your database'
-  npm run dev 'to run in development mode'
-  npm run build-react then npm start to run in production mode
