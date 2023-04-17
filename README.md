## Local Development Environment

### Prequisites

- [Docker](https://docs.docker.com/get-docker/)
- [PNPM](https://pnpm.io/)

### Environment Setup

```sh

# Install pnpm using Corepack
corepack enable

If you do not have `corepack` installed locally you can use `npm` or `yarn` to install `pnpm`:

npm install pnpm -g
# or
yarn install pnpm -g

```

# clone repo to your machine

git clone https://github.com/aandreiradu/inet-technical.git

To Install dependencies run:

```sh
pnpm i
```

### Local Playground

From the root of the project:

```sh
# Create a .env based on the .env file from /docker/.env.example OR run
cp ./docker/.env.example ./docker/.env

# This will start both the web and backend application
pnpm compose
```

After running the command above you will have:

- frontend available on http://localhost:5173/
- backend avaiable on http://localhost:4040/
