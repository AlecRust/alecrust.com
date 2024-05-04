import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'

/**
 * Initializes PhotoSwipe gallery
 */

function initializeGallery() {
  const gallery = new PhotoSwipeLightbox({
    gallery: '.js-gallery',
    children: 'li',
    pswpModule: () => import('photoswipe'),
    paddingFn: () => ({
      top: 30,
      bottom: 30,
      left: 70,
      right: 70,
    }),
  })

  // Init dynamic caption plugin
  new PhotoSwipeDynamicCaption(gallery, {
    type: 'below',
  })

  gallery.init()
}

export default initializeGallery
