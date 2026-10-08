# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.21
ARG ALPINE_VERSION=3.24

#############################################################
# Stage 1 - Deps installation                               #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
RUN corepack enable

WORKDIR /app

COPY --link ./package.json ./yarn.lock ./.yarnrc.yml ./

# - The yarn cache lives in a BuildKit cache mount: it is reused across builds
#   but never ends up in the image.
# - Source maps and markdown files are not needed at runtime (~175MB). They are
#   removed in the same layer as the install, otherwise they would still take
#   space in the image. Type declarations (.d.ts) are kept: `strapi develop`
#   generates types with typescript.
RUN --mount=type=cache,target=/var/cache/yarn,sharing=locked \
    YARN_CACHE_FOLDER=/var/cache/yarn \
    yarn install --immutable --inline-builds \
    && find node_modules -type f \( -name '*.map' -o -iname '*.md' \) -delete

#############################################################
# Stage 2 - Run final / make runnable image ready           #
#############################################################

# No `strapi build` stage: `strapi develop` builds the admin panel on startup
# and would not use a pre-built one. Add it back if switching to `strapi start`.

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner
RUN apk add --no-cache tzdata bash && corepack enable
ENV TZ=Europe/Brussels

WORKDIR /app

COPY --link ./package.json ./yarn.lock ./.yarnrc.yml ./favicon.png ./
COPY --link --from=deps /app/node_modules ./node_modules
COPY --link ./config ./config
# DANGER: if ./src is NOT COPIED, STRAPI WILL remove the database
COPY --link ./src ./src
COPY --link ./database ./database
# public/uploads is excluded by .dockerignore, it is mounted as a volume
COPY --link ./public ./public

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:1337/_health || exit 1

CMD ["./node_modules/.bin/strapi", "develop"]
