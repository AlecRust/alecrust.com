import '../css/app.css'
import initializeExpander from './expander'
import initializeGallery from './gallery'
import initializeSmoothScroll from './smoothScroll'

document.documentElement.classList.replace('no-js', 'js')

initializeExpander()
initializeGallery()
initializeSmoothScroll()
