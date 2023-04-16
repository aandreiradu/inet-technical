FROM node:lts-hydrogen

# Install PNPM
RUN corepack enable
RUN corepack prepare pnpm@8.2.0 --activate

# Set the working directory
WORKDIR /home/auchan
ARG VITE_BACKEND_URL                       
# ENV VITE_BACKEND_URL $VITE_BACKEND_URL 

# Copy lockfile, NVM and NPM configuration to the working directory
COPY pnpm-lock.yaml ./

# Fetch packages from lockfile (https://pnpm.io/cli/fetch#usage-scenario)
RUN pnpm fetch

# Add everything to the working directory
ADD . ./

# Install packages from virtual store
RUN pnpm install -r --offline

# Build backend
RUN echo $VITE_BACKEND_URL
RUN VITE_BACKEND_URL=$VITE_BACKEND_URL pnpm --filter app build
# RUN pnpm db:push


CMD ["pnpm","--filter","app","dev"]

