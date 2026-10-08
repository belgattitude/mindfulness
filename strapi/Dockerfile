# syntax=docker/dockerfile:1
#
# Build context: the repository root (pnpm monorepo), ie from strapi/:
#   docker build --file Dockerfile ..
#
ARG BUN_VERSION=1.4.2

#############################################################
# Stage 1 - Install and build strapi                        #
#############################################################

FROM oven/bun:${BUN_VERSION}-slim AS builder

# get-tool-version.mts reads tool versions from package.json (avoids installing jq)
COPY --link ./package.json ./strapi/docker/scripts/get-tool-version.mts /opt/docker-tools/

# Install pnpm at the version declared in the root package.json (devEngines).
# pnpm 12 ships a native executable, it does not need node
RUN PNPM_VERSION="$(bun /opt/docker-tools/get-tool-version.mts pnpm /opt/docker-tools/package.json)" \
    && bun install -g "pnpm@${PNPM_VERSION}"

WORKDIR /repo

# Workspace manifests first, so the install layer is only rebuilt when they change
COPY --link ./pnpm-lock.yaml ./pnpm-workspace.yaml ./package.json ./
COPY --link ./strapi/package.json ./strapi/
COPY --link ./web/package.json ./web/

# - Only strapi production dependencies: devDependencies (typescript 7, deploy
#   and backup scripts tooling) are not needed to build or run strapi.
# - The pnpm store lives in a BuildKit cache mount: it is reused across builds
#   but never ends up in the image.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm install --frozen-lockfile --prod --store-dir /pnpm/store \
    --filter mindfulness-strapi

COPY --link ./strapi ./strapi

# Standalone copy of strapi with its own node_modules (no workspace symlinks)
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm --filter mindfulness-strapi deploy --prod --legacy \
    --store-dir /pnpm/store /app

WORKDIR /app

ENV NODE_ENV=production
# The build loads the config (config/database.js needs a path) but does not open
# the database, the real value comes from the server .env at runtime
ENV DATABASE_FILENAME=.tmp/build.db

RUN ./node_modules/.bin/strapi build

# Not needed at runtime (~250MB): source maps, markdown, type declarations
# (only used by the admin build above). The runner copies the resulting files.
RUN find node_modules -type f \( -name '*.map' -o -iname '*.md' \
    -o -name '*.d.ts' -o -name '*.d.mts' -o -name '*.d.cts' \) -delete

#############################################################
# Stage 2 - Run final / make runnable image ready           #
#############################################################

FROM oven/bun:${BUN_VERSION}-slim AS runner
# Lets the deploy script remove only the untagged images of this app
LABEL app.mindfulness.image=strapi
ENV TZ=Europe/Brussels
ENV NODE_ENV=production

WORKDIR /app

COPY --link ./strapi/package.json ./strapi/favicon.png ./
COPY --link --from=builder /app/node_modules ./node_modules
COPY --link --from=builder /app/build ./build
COPY --link ./strapi/config ./config
# DANGER: if ./src is NOT COPIED, STRAPI WILL remove the database
COPY --link ./strapi/src ./src
COPY --link ./strapi/database ./database
# public/uploads is excluded by Dockerfile.dockerignore, it is mounted as a volume
COPY --link ./strapi/public ./public

EXPOSE 1337

# No wget/curl in the image, bun fetch is used instead
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD ["bun", "-e", "fetch('http://127.0.0.1:1337/_health').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

# Production mode: the content-type builder is disabled, content types are
# edited locally with `pnpm develop` and deployed with the image.
CMD ["bun", "--bun", "run", "strapi", "start"]
