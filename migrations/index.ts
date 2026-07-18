import * as migration_20260717_124955_initial from './20260717_124955_initial';
import * as migration_20260717_130359_add_news_images from './20260717_130359_add_news_images';

export const migrations = [
  {
    up: migration_20260717_124955_initial.up,
    down: migration_20260717_124955_initial.down,
    name: '20260717_124955_initial',
  },
  {
    up: migration_20260717_130359_add_news_images.up,
    down: migration_20260717_130359_add_news_images.down,
    name: '20260717_130359_add_news_images'
  },
];
