import type { Schema, Struct } from '@strapi/strapi';

export interface TourComponentsRegions extends Struct.ComponentSchema {
  collectionName: 'components_tour_components_regions';
  info: {
    displayName: 'Regions';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tour-components.regions': TourComponentsRegions;
    }
  }
}
