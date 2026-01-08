'use strict';

/**
 * one-hotel service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::one-hotel.one-hotel');
