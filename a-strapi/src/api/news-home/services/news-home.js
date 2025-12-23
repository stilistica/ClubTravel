'use strict';

/**
 * news-home service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-home.news-home');
