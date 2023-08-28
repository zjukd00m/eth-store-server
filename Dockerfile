# Installing dependencies step
FROM node:latest AS base

WORKDIR /opt/server

RUN apt-get update -y \
    && apt-get upgrade -y

COPY package.json package-lock.json /opt/server/

RUN npm install

# Compiling and running the code
FROM node:latest AS server

ENV POSTGRES_URL=${POSTGRES_URL}
ENV TYPEORM_SYNC_SCHEMA=${TYPEORM_SYNC_SCHEMA}
ENV NODE_ENV=${NODE_ENV}
ENV ETH_SERVER_PORT=${ETH_SERVER_PORT}

WORKDIR /opt/server

COPY --from=base /opt/server/node_modules /opt/server/node_modules
COPY src /opt/server/src
COPY config /opt/server/config
COPY package.json tsconfig.json tsconfig.build.json nest-cli.json /opt/server/

# Download wait-for-it.sh using curl and make it executable
# RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
# && chmod +x /usr/local/bin/wait-for-it.sh

RUN npm run build

# CMD ["wait-for-it.sh", "eth_store_db:5432", "--", "npm", "run", "start:prod"]
CMD ["npm", "run", "start:prod"]
