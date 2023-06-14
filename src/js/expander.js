document.querySelectorAll('.js-expander-button').forEach((button) => {
  button.addEventListener('click', () => {
    const expander = button.parentElement
    const content = expander.querySelector('.Expander-content')
    const isExpanded = expander.classList.toggle('is-expanded')

    content.style.maxHeight = isExpanded ? `${content.scrollHeight}px` : ''
    button.textContent = isExpanded ? 'Show less' : 'Show more'
    button.setAttribute('aria-expanded', isExpanded)
  })
})
