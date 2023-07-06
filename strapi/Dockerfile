ARG NODE_VERSION=18.16
ARG ALPINE_VERSION=3.18

#############################################################
# Stage 1 - Deps installation                               #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as deps
RUN apk add --no-cache tzdata bash && corepack enable
ENV TZ=Europe/Brussels

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./

RUN YARN_ENABLE_GLOBAL_CACHE="false" \
    YARN_ENABLE_MIRROR="false" \
    YARN_CACHE_FOLDER=/var/cache/yarn-artist-strapi \
    YARN_COMPRESSION_LEVEL=0 \
    YARN_CHECKSUM_BEHAVIOR=ignore \
    yarn install --immutable --inline-builds

#############################################################
# Stage 2 - Build from installation in deps stage           #
#############################################################

FROM deps as builder
RUN corepack enable

ARG DATABASE_FILENAME
ENV DATABASE_FILENAME ${DATABASE_FILENAME}

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN NODE_ENV=production yarn build


#############################################################
# Stage 3 - Run final / make runnable image ready           #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as runner
RUN apk add --no-cache tzdata bash && corepack enable
ENV TZ=Europe/Brussels

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./favicon.png ./
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/config ./config
# DANGER: if ./src is NOT COPIED, STRAPI WILL remove the database
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/database ./database
EXPOSE 1337
CMD ["./node_modules/.bin/strapi", "develop"]


