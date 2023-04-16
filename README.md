## Local Development Environment

### Prequisites

- [Docker](https://docs.docker.com/get-docker/)
- [PNPM](https://pnpm.io/)

### Environment Setup

```sh

# clone repo
git clone https://github.com/aandreiradu/inet-technical.git

# install depedencies
cd inet-technical
pnpm i

```

### .env SAMPLES - create a .env file in app and backend

```sh

# path /packages/app
VITE_BACKEND_PORT=4040
VITE_BASE_URL="http://localhost:4040"

# path /packages/backend
DATABASE_URL=""
PORT=4040
AUCHAN_LOGIN_ACCESS_SECRET = "auchanACCESS_121314"
AUCHAN_LOGIN_ACCESS_EXPIRATION_PARAM = 900
AUCHAN_LOGIN_REFRESH_SECRET = "auchanREFRESH_121314"
AUCHAN_LOGIN_REFRESH_EXPIRATION_PARAM = 3600

```
