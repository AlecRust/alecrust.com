/**
 * Attaches event listeners to elements with the class '.js-expander-button'
 * for toggling the expansion of the associated content.
 */
document.querySelectorAll('.js-expander-button').forEach((button) => {
  button.addEventListener('click', () => toggleExpansion(button))
})

/**
 * Toggles the expansion state of content associated with the given button.
 *
 * @param {HTMLElement} button - The button used to toggle content expansion.
 */
function toggleExpansion(button) {
  const expanderContainer = button.parentElement
  const content = expanderContainer?.querySelector('.Expander-content')
  const isExpanded = expanderContainer.classList.toggle('is-expanded')

  content.style.maxHeight = isExpanded ? `${content.scrollHeight}px` : ''
  button.textContent = isExpanded ? 'Show less' : 'Show more'
  button.setAttribute('aria-expanded', isExpanded)
}
