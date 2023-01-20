# Project-API-TASKS

This project contains both a client and a server for the management of projects.

## Starting 🚀

![taskaban|500](readme/taskaban.gif)

## Installation and Configuration 🛠️

1. Clone the repository or download the files.
2. In the root directory, run `npm install` to install the required dependencies for both the client and the server.
3. For the server, create a `.env` file in the root directory and set up the necessary environment variables.
4. For the client, create a `.env` file in the client directory and set up the necessary environment variables.
5. Run `npm run dev` in the root directory to start the client and the server in development mode.

# Client

The client is a private module built with React, using the following packages:

- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome
- React Color
- React Flip Move
- React Router DOM
- React Transition Group
- Socket.io Client

It also uses the following dev dependencies:

- @types/react
- @types/react-dom
- @vitejs/plugin-react
- Autoprefixer
- PostCSS
- Tailwind CSS
- Vite

The client can be run in development mode with the command `npm run dev`, built with `npm run build`.

# Server

The server is built with Node.js, using the following packages:

- CORS
- dotenv
- Express
- http-status
- Mongoose
- Socket.io
- Winston

It also uses the following dev dependency:

- nodemon
  The server can be run in development mode with the command npm run dev, in production mode with npm run prod, and test with npm run test.

# License

This project is licensed under the ISC license.
