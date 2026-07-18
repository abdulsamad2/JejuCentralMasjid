import * as migration_20260717_124955_initial from './20260717_124955_initial';
import * as migration_20260717_130359_add_news_images from './20260717_130359_add_news_images';
import * as migration_20260718_181229_add_pageviews from './20260718_181229_add_pageviews';
import * as migration_20260718_182634_add_campaign from './20260718_182634_add_campaign';

export const migrations = [
  {
    up: migration_20260717_124955_initial.up,
    down: migration_20260717_124955_initial.down,
    name: '20260717_124955_initial',
  },
  {
    up: migration_20260717_130359_add_news_images.up,
    down: migration_20260717_130359_add_news_images.down,
    name: '20260717_130359_add_news_images',
  },
  {
    up: migration_20260718_181229_add_pageviews.up,
    down: migration_20260718_181229_add_pageviews.down,
    name: '20260718_181229_add_pageviews',
  },
  {
    up: migration_20260718_182634_add_campaign.up,
    down: migration_20260718_182634_add_campaign.down,
    name: '20260718_182634_add_campaign'
  },
];
