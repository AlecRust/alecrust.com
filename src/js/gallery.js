import PhotoSwipeLightbox from 'photoswipe/lightbox'

const gallery = new PhotoSwipeLightbox({
  gallery: '.js-gallery',
  children: 'li',
  pswpModule: () => import('photoswipe'),
})
gallery.init()
