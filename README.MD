# Card Game Compiler Project

For Senior Design Spring / Summer '26

## Instructions for Developers

```terminal
npm i
npm run dev
```

## Instructions for Production Deployment

### Step 1: Install dependencies

Dependiencies: NodJS, NPM

For production deployment, it is recommended that you use a webserver such as Apache or Nginx to handle SSL certificates

### Step 2: Install the project code

Clone the source code, then run these commands from inside the directory:

```terminal
npm i
npm run prod
```

### Step 3: Configure Web Proxy

If you are using Nginx or Apache, configure your web proxy to forward requests to the npm's socket address, 8020

## To Generate Documentation

```terminal
npx typedoc --entryPointStrategy Expand src
```