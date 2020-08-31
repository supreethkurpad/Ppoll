# Ppoll
A polling website made using NodeJS, Express, React and MongoDB.
http://ppoll-web.herokuapp.com/

# About The Website

Users can sign up and create polls and share it with people using poll links. The users can choose the poll to be private or public. Public polls show up on the discover page whereas private polls can be shared using the poll link only. Delete poll functionality has been made available to the creator of the poll.

# Project implementation and structure

The project uses Bcrypt to hash user passwords and mongodb atlas to store the user and corresponding polls on database. The client folder contains a react front-end and the server folder contains a NodeJS  backend. The UI frameworks used are AntDesign and Bootstrap. Axios is used to communicate between the front-end and backend.
The routes folder contains all API endpoints for the backend. The middleware folder contains JS file to verify user token using JWT. The endpoints are protected using this middleware. The models folder contains mongoose schema for USER and POLL types. React's context hook is used to maintain user context. The JWT tokens are stored on local storage along user details.
The site has been made mobile friendly and responsive using Flex grids in Ant-Design.

# Running it locally
  
  1. Clone the repository.
  2. Move to the project folder and run "npm install" to donwload all dependencies.
  3. Put in your API keys in a .env file.
  4. Run "Node app" in the server folder.
  5. Move to the client folder
  6. Run "npm start" to run the client side.
