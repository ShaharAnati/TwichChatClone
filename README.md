# TwichChatClone

## How to run the project

The project is split into two parts, Server and Client.

### Running the client

- In the folder ~/client, run `npm i`

#### For development:
- Run `npm start`, this will use webpack to bundle the project and listen to changes

#### For production:
- Run `npm run build`, this will use webpack to bundle the project, without continuing to listen for client-side changes

### Running the server
- In the root folder, run `npm i`
- run `npm start`
- The server is now running on port 3000
- Whether you ran the client-side for dev or for prod, it is automatically served at this endpoint, no need to do anything else :)
