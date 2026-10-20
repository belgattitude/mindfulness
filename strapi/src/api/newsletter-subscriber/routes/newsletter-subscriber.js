/**
 * newsletter-subscriber router
 *
 * Only the public subscribe route: no core routes, the subscribers are
 * never readable from the REST api (only in the admin).
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter-subscribers/subscribe',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.subscribe',
      // Public without a permission to tick in the admin of each environment
      config: { auth: false },
    },
  ],
};
