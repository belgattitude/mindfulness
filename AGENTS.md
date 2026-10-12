# Mindfulness

Website of Sandrine Rauter (mindfulness, yoga, conscious dialogue). The UI and
the content are in French.

## Apps

pnpm workspace (`pnpm-workspace.yaml`), pnpm 12, Node >= 24.21 and Bun >= 1.4.3
(`devEngines` in the root `package.json`, also read by the CI). Strapi
`develop`/`start` and the web `build` run on Bun, the maintenance scripts
(`node scripts/*.mts`) on Node.

| Folder    | Package             | What                    | Tech                                                                                                                                                                       |
| --------- | ------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strapi/` | `mindfulness-strapi` | CMS and REST api        | Strapi 5 (sqlite with better-sqlite3), documentation plugin (writes the OpenAPI spec), nodemailer email. Runs on bun in production (docker image, see `strapi/README.md`) |
| `web/`    | `web`               | The public site         | Next.js 16 (app router, read `web/AGENTS.md`), React 19, Tailwind 4, TanStack Query with orval generated hooks, Base UI, lucide icons, Vitest, Storybook, Ultracite (oxlint/oxfmt), TypeScript 7 |

`docs/` holds docker cleanup notes, `.github/workflows/` the CI (strapi, strapi docker image, web).

## Run the repo

```bash
pnpm install
cp strapi/.env.example strapi/.env   # web/.env holds the production values, web/.env.development the local site url (next dev)
pnpm dev:strapi                      # http://localhost:1337/admin
pnpm dev:web                         # http://localhost:3000, needs strapi running
```

Run pnpm scripts non-interactively: `verifyDepsBeforeRun: install` makes pnpm
check the install before every script and it can wait on a prompt forever.
Use `CI=true pnpm <script> < /dev/null`.

## Scripts

From the root (recursive): `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.

`web/` (`pnpm --filter web <script>`):

| Script            | What                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `dev`             | next dev                                                             |
| `typecheck`       | next typegen + tsc                                                   |
| `lint`, `lint:fix`| ultracite (oxlint + oxfmt), run `lint:fix` after editing             |
| `test`            | vitest, tests in `__tests__/` folders next to the code               |
| `codegen-openapi` | regenerates `src/openapi/` from the strapi OpenAPI spec (orval)      |
| `storybook`       | http://localhost:6006                                                |

`strapi/` (`pnpm --filter mindfulness-strapi <script>`):

| Script                | What                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| `develop`             | strapi with the admin, regenerates the types and the OpenAPI spec on schema changes    |
| `typecheck`           | typechecks `scripts/` only                                                             |
| `migrate:blocks`      | converts markdown left in `blocks` fields (dry run, `--write` saves)                   |
| `deploy`              | builds and deploys the docker image over ssh: **production, ask first**                |
| `backup:db`, `backup:env` | copies the server database / secrets into `strapi/backup/`                          |
| `pull:prod`           | replaces the local database and uploads with the server ones, without backup: **ask first** |
| `push:prod`           | replaces the server database with the local one (backup kept on the server, typed `yes` confirmation): **production, ask first** |

The server scripts read `strapi/.env.deploy`, see `strapi/README.md`.

## Changing a content type

1. Edit `strapi/src/api/<name>/content-types/<name>/schema.json` (or the admin
   content-type builder in `develop`, it is disabled in production).
2. `strapi develop` regenerates `strapi/types/generated/` and
   `strapi/src/extensions/documentation/documentation/1.0.0/full_documentation.json`:
   commit them.
3. `pnpm --filter web codegen-openapi`: never edit `web/src/openapi/` by hand.
4. Content entered locally does not reach production: the production content
   is edited in the production admin (or migrated with a script after deploy).

## Data

- Local database: `strapi/sqlite/mindfulness.sqlite.db` (`DATABASE_FILENAME`),
  uploads in `strapi/public/uploads`. Backups in `strapi/backup/` (git ignored).
  `sqlite3` is available to inspect it.
- Try a database change on a copy:
  `sqlite3 strapi/sqlite/mindfulness.sqlite.db ".backup strapi/sqlite/.copy.db"`
  then `DATABASE_FILENAME=sqlite/.copy.db node scripts/<script>.mts`.
- Content types with draft and publish have two rows per document (draft and
  published): update both.
- Content history is not available (community plan).

## Web conventions

- Pages are server components (`export const dynamic = "force-dynamic"`): they
  prefetch with the orval `get…QueryOptions`, wrap a client component in
  `HydrationBoundary`, the client component reads it with the `useGet…` hook.
- Rich text fields are strapi `blocks` (json, typed `unknown` by the spec):
  render them with `BlocksText` (`@strapi/blocks-react-renderer`), get their
  plain text with `getBlocksText` (`src/lib/text/text.utils.ts`). There is no
  markdown left.
- Contact details (email, phone, whatsapp, linkedin) come from the strapi
  `contact` single type: the contact page and the footer (fetched in
  `MainLayout`) read them, nothing is hardcoded.
- Agenda filters are path segments, the universe first:
  `/agenda/yoga/stages-et-retraites` (`src/components/Event/agendaFilters.ts`,
  values in `siteConfig.search`). Other orders redirect, unknown segments 404.
- Page metadata: always `getPageMetadata()` (`src/lib/metadata/page-metadata.ts`),
  it sets the link previews (open graph, twitter) that a page would otherwise
  lose (shallow merge). Shared images are `opengraph-image.tsx` routes using
  `renderOgImage()` (`src/lib/og/og-image.tsx`, fonts in `web/assets/fonts`).
- Strapi media urls: `getStrapiMedia` (`src/lib/strapi`).
- Lucide has no brand icons: they are inline svgs (`src/components/Contact/ContactIcons.tsx`).
- No hardcoded colors (lint rule): use the theme colors (`brand-color-*`,
  `title-color-*`, `nav-title`, neutral…).
- French texts use the typographic apostrophe (’) and `&rsquo;` in jsx.
- Comments explain why, in short sentences, as in the existing code.
