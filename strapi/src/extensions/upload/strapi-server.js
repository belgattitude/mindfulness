const IMAGES_MIDDLEWARE = 'global::upload-images';

// Upload (and replace, ?id=) routes of the admin media library and the content api
const addImageProcessing = (routes) => {
  for (const route of routes) {
    if (route.method === 'POST' && route.path === '/') {
      route.config = {
        ...route.config,
        middlewares: [...(route.config?.middlewares ?? []), IMAGES_MIDDLEWARE],
      };
    }
  }
};

export default (plugin) => {
  addImageProcessing(plugin.routes.admin.routes);
  addImageProcessing(plugin.routes['content-api'].routes);
  return plugin;
};
