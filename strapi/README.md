## Development

```bash
yarn develop     # strapi on http://localhost:1337/admin
yarn typecheck   # typecheck the scripts/ folder (typescript 7)
```

## Server scripts

The deploy, backup and copy scripts work over SSH and read their settings from
`.env.deploy` (git ignored):

```bash
cp .env.deploy.example .env.deploy
```

| Variable                   | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| `REMOTE_SSH`               | `user@host` or an alias from `~/.ssh/config`                                 |
| `REMOTE_SSH_PORT`          | Optional, when ssh does not listen on 22                                    |
| `REMOTE_SSH_KEY`           | Optional, when the key is not loaded in the ssh agent                       |
| `DEPLOY_DIR`               | Server directory holding `docker-compose.yml` and `.env` (strapi secrets)   |
| `BACKUP_REMOTE_SQLITE_DIR` | Server directory holding the sqlite database                                |
| `REMOTE_UPLOADS_DIR`       | Server directory holding the uploads                                        |

The file is loaded with [dotenvx](https://dotenvx.com), values can be encrypted
(the private key is stored in the OS keychain, or set `DOTENV_PRIVATE_KEY_DEPLOY`):

```bash
yarn dotenvx encrypt -f .env.deploy
```

### Deploy

```bash
yarn deploy
```

Builds the image for the server architecture, uploads it with
[docker pussh](https://github.com/psviderski/unregistry) (only the missing layers,
no registry), uploads `docker-compose.yml` to `DEPLOY_DIR`, creates the
`cloud-net` network if missing, restarts strapi and waits for it to be healthy.
The server `.env` is never deployed, it must exist in `DEPLOY_DIR`.

The image runs strapi on [bun](https://bun.sh) in production mode (`yarn start-bun`,
admin built in the image with node): the content-type builder is disabled on the
server, content types are edited locally with `yarn develop` and deployed with
the image.

Requirements:

- docker pussh: `brew install psviderski/tap/docker-pussh` then
  `ln -sf $(brew --prefix)/bin/docker-pussh ~/.docker/cli-plugins/docker-pussh`
- On the server, the ssh user must be root or in the docker group.

Each deploy is also tagged with the git commit (`-dirty` with uncommitted
changes). To roll back, on the server in `DEPLOY_DIR`:

```bash
docker tag mindfulness-strapi:<sha> mindfulness-strapi:latest
docker compose up -d --no-build mindfulness-strapi
```

### Backups

Backups are saved in `backup/<type>/<YYYY-MM-DD_HH-mm-ss>/` (git ignored).

```bash
yarn backup:db                 # sqlite database, consistent snapshot of the running strapi
yarn backup:db --no-snapshot   # copy the sqlite file as is (when strapi is stopped)
yarn backup:env                # server .env (secrets), readable by the current user only
```

`backup:db` makes the copy inside the running container with the sqlite online
backup API, so it is consistent even if strapi writes during the backup.

### Copy the server uploads

```bash
yarn copy-remote-uploads
```

Copies the server uploads into `public/uploads`, so the local strapi serves the
same media as the server database. Local files missing on the server are kept.

## Docker

The compose services use the external `cloud-net` network, create it once:

```bash
docker network create --driver bridge cloud-net
```

```bash
docker compose run mindfulness-strapi sh
```
