FROM node:12.4

RUN node --version && npm --version

# Create working Directory
RUN mkdir -p /usr/src/app

# Set Working Directory
WORKDIR /usr/src/app

COPY package.json ./

# Bundle app source
COPY ./ ./

#
#ARG NODE_ENV=${NODE_ENV}

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG NPM_CONFIG_PRODUCTION
ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION
ARG API_URL
ENV API_URL=$API_URL
ARG SITE_URL
ENV SITE_URL=$SITE_URL
ARG GATEWAY_UUID
ENV GATEWAY_PUBLIC=$GATEWAY_PUBLIC
ARG RISE_API_PUBLIC
ENV RISE_API_PUBLIC=$RISE_API_PUBLIC
ARG RISE_DEFAULT_CHANNEL
ENV RISE_DEFAULT_CHANNEL=$RISE_DEFAULT_CHANNEL


RUN if [ "$NODE_ENV" = "production" ] ; then echo environemnt is $NODE_ENV ; else echo environment is $NODE_ENV ; fi

# Install
RUN npm install

RUN npm run build

CMD [ "node", "__sapper__/build" ]
