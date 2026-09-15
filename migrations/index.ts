import * as migration_20260717_124955_initial from './20260717_124955_initial';
import * as migration_20260717_130359_add_news_images from './20260717_130359_add_news_images';
import * as migration_20260718_181229_add_pageviews from './20260718_181229_add_pageviews';
import * as migration_20260718_182634_add_campaign from './20260718_182634_add_campaign';
import * as migration_20260720_090759_add_receipts from './20260720_090759_add_receipts';
import * as migration_20260911_054540_gallery_and_slider from './20260911_054540_gallery_and_slider';
import * as migration_20260911_061908_slider_visibility from './20260911_061908_slider_visibility';
import * as migration_20260911_084959_visit_requests from './20260911_084959_visit_requests';
import * as migration_20260911_091129_visit_request_details from './20260911_091129_visit_request_details';
import * as migration_20260911_094002_single_image_library from './20260911_094002_single_image_library';
import * as migration_20260915_122457_email_tracking from './20260915_122457_email_tracking';

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
    name: '20260718_182634_add_campaign',
  },
  {
    up: migration_20260720_090759_add_receipts.up,
    down: migration_20260720_090759_add_receipts.down,
    name: '20260720_090759_add_receipts',
  },
  {
    up: migration_20260911_054540_gallery_and_slider.up,
    down: migration_20260911_054540_gallery_and_slider.down,
    name: '20260911_054540_gallery_and_slider',
  },
  {
    up: migration_20260911_061908_slider_visibility.up,
    down: migration_20260911_061908_slider_visibility.down,
    name: '20260911_061908_slider_visibility',
  },
  {
    up: migration_20260911_084959_visit_requests.up,
    down: migration_20260911_084959_visit_requests.down,
    name: '20260911_084959_visit_requests',
  },
  {
    up: migration_20260911_091129_visit_request_details.up,
    down: migration_20260911_091129_visit_request_details.down,
    name: '20260911_091129_visit_request_details',
  },
  {
    up: migration_20260911_094002_single_image_library.up,
    down: migration_20260911_094002_single_image_library.down,
    name: '20260911_094002_single_image_library',
  },
  {
    up: migration_20260915_122457_email_tracking.up,
    down: migration_20260915_122457_email_tracking.down,
    name: '20260915_122457_email_tracking'
  },
];
