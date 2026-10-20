/**
 * newsletter-subscriber controller
 */

import factories from '../../../utils/factories.cjs';

const uid = 'api::newsletter-subscriber.newsletter-subscriber';

const sources = ['contact', 'footer'];

// Loose on purpose: the email attribute validates it again
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

/** Tells the contact address of the site, best effort */
const notifyNewSubscriber = async (strapi, email) => {
  try {
    const contact = await strapi
      .documents('api::contact.contact')
      .findFirst({ fields: ['email'] });
    if (!contact?.email) {
      return;
    }
    await strapi.plugin('email').service('email').send({
      to: contact.email,
      subject: 'Nouvelle inscription à la newsletter',
      text: `${email} s’est inscrit·e à la newsletter depuis le site.`,
    });
  } catch (error) {
    strapi.log.warn(`Newsletter notification not sent: ${error.message}`);
  }
};

export default factories.createCoreController(uid, ({ strapi }) => ({
  async subscribe(ctx) {
    const body = ctx.request.body?.data ?? {};
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (email.length > 254 || !emailRegex.test(email)) {
      return ctx.badRequest('Invalid email');
    }
    const source = sources.includes(body.source) ? body.source : null;

    const existing = await strapi
      .documents(uid)
      .findFirst({ filters: { email }, fields: ['id'] });
    // Same answer when already subscribed: it does not reveal who is
    if (!existing) {
      await strapi.documents(uid).create({ data: { email, source } });
      await notifyNewSubscriber(strapi, email);
    }
    ctx.body = { data: { subscribed: true } };
  },
}));
