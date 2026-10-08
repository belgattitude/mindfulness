// @strapi/strapi's ESM build cannot be imported by node (it imports named
// exports from lodash, a CommonJS package): load its CommonJS build instead,
// which is also the instance used by strapi itself.
module.exports = require('@strapi/strapi').factories;
