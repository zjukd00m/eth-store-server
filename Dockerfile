# Installing dependencies step
FROM node:16-buster AS base

ARG POSTGRES_URI_ARG
ENV POSTGRES_URI=${POSTGRES_URI_ARG}

WORKDIR /opt/server

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install git

COPY package.json package-lock.json /opt/server/

RUN npm install

# Compiling and running the code
FROM node:16-buster AS server

ARG POSTGRES_URI_ARG
ENV POSTGRES_URI=${POSTGRES_URI_ARG}

WORKDIR /opt/server

COPY --from=base /opt/server/node_modules /opt/server/node_modules
COPY src /opt/server/src
COPY package.json tsconfig.json tsconfig.build.json nest-cli.json /opt/server/

RUN npm run build

CMD ["npm", "run", "start:prod"]
