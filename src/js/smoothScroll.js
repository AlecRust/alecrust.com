/**
 * Attaches event listeners to elements with the class '.js-smooth-scroll'
 * for smooth scrolling to target elements on click.
 */
document.querySelectorAll('.js-smooth-scroll').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const target = link.getAttribute('href')
    smoothScrollTo(target)
  })
})

/**
 * Smoothly scrolls to the specified target if it exists.
 * Respects the user's preference regarding reduced motion.
 *
 * @param {string} selector - The selector of the element to scroll to.
 */
function smoothScrollTo(selector) {
  const targetElement = document.querySelector(selector)

  if (targetElement) {
    const shouldReduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const options = shouldReduceMotion ? {} : { behavior: 'smooth' }

    targetElement.scrollIntoView(options)
  }
}
