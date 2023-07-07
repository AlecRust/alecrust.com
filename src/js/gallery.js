import PhotoSwipeLightbox from 'photoswipe/lightbox'

/**
 * Initializes PhotoSwipe gallery
 */

function initializeGallery() {
  const gallery = new PhotoSwipeLightbox({
    gallery: '.js-gallery',
    children: 'li',
    pswpModule: () => import('photoswipe'),
  })

  gallery.init()
}

initializeGallery()
