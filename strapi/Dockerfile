# syntax=docker/dockerfile:1
ARG BUN_VERSION=1.4.2

#############################################################
# Stage 1 - Production deps installation                    #
#############################################################

FROM oven/bun:${BUN_VERSION}-slim AS deps
RUN bun install corepack -g && corepack enable

WORKDIR /app

COPY --link ./package.json ./yarn.lock ./.yarnrc.yml ./

# - Only production dependencies: devDependencies (typescript 7, deploy and
#   backup scripts tooling) are not needed to build or run strapi.
# - The yarn cache lives in a BuildKit cache mount: it is reused across builds
#   but never ends up in the image.
# - Source maps and markdown files are not needed (~175MB). They are removed in
#   the same layer as the install, otherwise they would still take space.
# - The @swc/core postinstall loads its native binding, which hardlinks it in
#   ~/.cache/swc-native-0. The binding then refuses to load from a cache entry
#   with more than one link, breaking the admin build: the cache is removed so
#   it is recreated on first use.
RUN --mount=type=cache,target=/var/cache/yarn,sharing=locked \
    YARN_CACHE_FOLDER=/var/cache/yarn \
    yarn install --frozen-lockfile \
    && find node_modules -type f \( -name '*.map' -o -iname '*.md' \) -delete \
    && rm -rf /root/.cache/swc-native-0

#############################################################
# Stage 2 - Build the admin panel                           #
#############################################################

FROM deps AS builder

ENV NODE_ENV=production
# The build loads the config (config/database.js needs a path) but does not open
# the database, the real value comes from the server .env at runtime
ENV DATABASE_FILENAME=.tmp/build.db

COPY --link ./config ./config
COPY --link ./src ./src
COPY --link ./database ./database
COPY --link ./public ./public
COPY --link ./favicon.png ./

RUN ./node_modules/.bin/strapi build

#############################################################
# Stage 3 - Runtime deps                                    #
#############################################################

FROM deps AS prod-deps
RUN find node_modules -type f \( -name '*.d.ts' -o -name '*.d.mts' -o -name '*.d.cts' \) -delete

#############################################################
# Stage 4 - Run final / make runnable image ready           #
#############################################################

FROM oven/bun:${BUN_VERSION}-slim AS runner
ENV TZ=Europe/Brussels
ENV NODE_ENV=production

WORKDIR /app

COPY --link ./package.json ./favicon.png ./
COPY --link --from=prod-deps /app/node_modules ./node_modules
COPY --link --from=builder /app/build ./build
COPY --link ./config ./config
# DANGER: if ./src is NOT COPIED, STRAPI WILL remove the database
COPY --link ./src ./src
COPY --link ./database ./database
# public/uploads is excluded by .dockerignore, it is mounted as a volume
COPY --link ./public ./public

EXPOSE 1337

# No wget/curl in the image, bun fetch is used instead
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD ["bun", "-e", "fetch('http://127.0.0.1:1337/_health').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

# Production mode: the content-type builder is disabled, content types are
# edited locally with `yarn develop` and deployed with the image.
# start-bun: bun --bun run strapi start
CMD ["bun", "--bun", "run", "strapi", "start"]
