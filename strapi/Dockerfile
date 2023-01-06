ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17
ARG NODE_ENV=development

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as deps
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
RUN corepack enable
ENV NODE_ENV=${NODE_ENV} \
    YARN_ENABLE_GLOBAL_CACHE="false" \
    YARN_INSTALL_STATE_PATH="/app/.yarn/docker/install-state.gz"

WORKDIR /app
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN --mount=type=cache,target=/app/.yarn-cache \
    YARN_CACHE_FOLDER=/app/.yarn-cache \
    yarn install --immutable --inline-builds

WORKDIR /app
COPY ./ .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "develop"]
#CMD ["./node_modules/.bin/strapi", "develop"]

