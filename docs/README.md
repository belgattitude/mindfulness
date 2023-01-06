## Docker

```
docker volume ls -f name=mindfulness -f label=type=removable
docker volume rm $(docker volume ls -f name=mindfulness -q)
```

### BuildX caches

```bash
docker buildx inspect  # to see reclaimable space
docker buildx prune    # to prune cache
```

