
# Build a Fynd Extension using Node.js + React.js
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

[![Coverage Status][coveralls-badge]]([coveralls-url])

This project outlines the development process for a Fynd extension that displays product listings for a company and its associated applications. By following this guide, you'll be able to set up the development environment, build the extension locally, and understand the testing procedures.

## Quick start
### Prerequisites
* You have installed globally [Node 18.X.X](https://docs.npmjs.com/) or above version.
* You have fdk-cli installed [install](https://github.com/gofynd/fdk-cli)
* You have created a [partner account](https://partners.fynd.com).
* You have created a [development account](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#create-development-account) and [populated test data](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#populate-test-data) in it.

## Install Template Locally
To initialize your extension template locally, run the following command:
```shell
fdk extension init --template node-react
```
Enter your preferred extension name and type, and you are all set.

## Local Development
To start local development, execute the following command:
```shell
fdk extension preview
```
This command will provide a partner’s panel URL where you can interact with your extension. For more information, please read this [guide](https://github.com/gofynd/fdk-cli?tab=readme-ov-file#extension-commands).

## Render Deployment (UAT)

To deploy this extension to Render for UAT testing:

### 1. Prepare your code
```bash
# Make sure you're in the project root
cd /Users/yuktimadan/ExtensionYM

# Build the frontend (optional, Render will do this automatically)
npm run build
```

### 2. Connect to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Choose the branch you want to deploy

### 3. Configure the service
Render will automatically detect the `render.yaml` configuration:

- **Name**: `fynd-extension-uat`
- **Runtime**: Node.js
- **Build Command**: `npm install && cd frontend && npm install && npm run build && cd ..`
- **Start Command**: `npm run start:prod`

### 4. Set Environment Variables
In Render dashboard, add these environment variables:

```
EXTENSION_API_KEY=69f88b3108cbc1e1abff6163
EXTENSION_API_SECRET=0Qt5g0-CcOPADqG
EXTENSION_BASE_URL=https://your-app-name.onrender.com
BACKEND_PORT=10000
FP_API_DOMAIN=https://api.uat.fyndx1.de
NODE_ENV=production
```

**Important**: Replace `https://your-app-name.onrender.com` with your actual Render app URL.

### 5. Deploy
Click "Create Web Service" to deploy.

### 6. Update Fynd Partner Panel
After deployment, update your extension's base URL in the Fynd Partner Panel to match your Render URL.

### Manual Deployment (Alternative)
If you prefer manual deployment:

```bash
# Install dependencies
npm install
npm run build

# Set environment variables and start
EXTENSION_API_KEY=... EXTENSION_API_SECRET=... EXTENSION_BASE_URL=https://your-render-url.onrender.com BACKEND_PORT=10000 FP_API_DOMAIN=https://api.uat.fyndx1.de npm run start:prod
```

## Docker Instructions

To run the application using Docker in Production environment, follow these steps:
* Build the Docker image:
    ```shell
    docker build -t extension .
    ```
* Run the Docker container
  ```
  docker run -p 8080:8080 extension 
  ```

To Run the extension with Docker locally, ensure you first prepare your environment:

- Copy the .env.example file and rename it to .env at the root of your project.
- Fill in all the required values in the .env file.
- Never commit `.env` or any file that contains real environment variables and secrets; use `.env.example` (with placeholder values only) for documentation in the repository.

After setting up your .env file, you can proceed with the Docker commands listed above to build and run your extension locally. 

## Database Configuration

By default, this template uses an `SQLite` database to store session data. SQLite is sufficient for development purpose only, it may not be suitable for all production scenarios. The best database for your application depends on your data requirements and query patterns.

If your app requires a more robust database solution, you can easily extend the base storage class provided by the `fdk-extension-javascript` library to use a database of your choice for session data. Here are some databases that we support by default:

- SQLite
- Memory Storage
- Redis

Feel free to configure and run your preferred database on your server to meet your specific needs.

## Tech Stack
1. [fdk-client-javascript](https://github.com/gofynd/fdk-client-javascript): This library contains all the methods to call Fynd platform APIs.
2. [fdk-extension-javascript](https://github.com/gofynd/fdk-extension-javascript): This library streamlines the setup of authentication for accessing Fynd Platform APIs. It also simplifies the process of subscribing to webhooks for receiving real-time notifications.


[coveralls-badge]: https://coveralls.io/repos/github/gofynd/example-extension-javascript-react/badge.svg?branch=main&&kill_cache=1
[coveralls-url]: https://coveralls.io/github/gofynd/example-extension-javascript-react?branch=main
