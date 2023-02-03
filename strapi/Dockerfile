ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as deps
# Installing libvips-dev for sharp Compatibility
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev && \
    corepack enable

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN --mount=type=cache,target=/var/cache/yarn-mindfulness-strapi,rw \
    YARN_ENABLE_GLOBAL_CACHE="false" \
    YARN_CACHE_FOLDER=/var/cache/yarn-mindfulness-strapi \
    yarn install --immutable --inline-builds

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as builder
RUN apk add --no-cache bash && \
    corepack enable

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN NODE_ENV=production yarn build


FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as runner
RUN apk update --no-cache && apk add --no-cache vips-dev
#RUN apk update --no-cache
RUN corepack enable

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./favicon.png ./
COPY --from=deps /app/node_modules ./node_modules
#COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/config ./config
# DANGER: if ./src is NOT COPIED, STRAPI WILL remove the database
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/database ./database
EXPOSE 1337
CMD ["./node_modules/.bin/strapi", "start"]


