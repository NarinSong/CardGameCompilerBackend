# Card Game Compiler Project

For Senior Design Spring / Summer '26

## Instructions for Developers

```terminal
npm i
npm run dev
```

## Instructions for Production Deployment

### Step 1: Install dependencies

Dependiencies: NodeJS, NPM, MariaDB

For production deployment, it is recommended that you use a webserver such as Apache or Nginx to handle SSL certificates

### Step 2: Install the project code

```terminal
# Clone the source code
git clone https://github.com/NarinSong/CardGameCompilerBackend.git
# Go into the directory
cd CardGameCompilerBackend
# Set up the database
# NOTE: Edit the password in database_schema.sql - DO NOT USE 'password'
mariadb -u root -p
```
```SQL
SOURCE database_schema.sql;
exit;
```

Set up a .env file in the project root with the password
```
# Use the same database password here that you created the database user with
# Note: special characters may break echo. Use any text editor to create the .env file instead
echo PASSWORD=password > .env
```

```terminal
# install the project depenedencies and run
npm i
npm run prod
```

### Step 3: Configure Web Proxy

If you are using Nginx or Apache, configure your web proxy to forward requests to the npm's socket address, 8020

Example nginx configuration

```nginx
server {
        server_name cg.smach.us;

        # Optional. Serve HTML to non-socket.io queries
        root /var/CardGameCompilerBackend/web-root;

        # Only listed for socket.io queries
        location /socket.io/ {
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                
                proxy_pass http://localhost:8020;

                # Allow and encourage websocket connections
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
}
```

## To Generate Documentation

```terminal
npx typedoc --entryPointStrategy Expand src
```