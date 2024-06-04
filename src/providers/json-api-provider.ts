import { Provider } from '@nestjs/common';

export const JSON_API_OPTIONS = 'JSON_API_OPTIONS';

export const jsonApiProvider: Provider = {
  provide: JSON_API_OPTIONS,
  useValue: {
    routes: {
      type: 'routes',
      options: {
        attributes: ['origin', 'destination', 'travelDate', 'created_at', 'updated_at'],
        keyForAttribute: 'camelCase',
      },
    },
    // Otros recursos pueden ser definidos aquí
  },
};
