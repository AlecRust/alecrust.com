// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders correctly', async ({ page }) => {
    const image = await page.screenshot({ fullPage: true })
    expect(image).toMatchSnapshot('render-snapshot.png')
  })

  test('scrolls to the contact section', async ({ page }) => {
    const contactLink = page.locator('.js-smooth-scroll[href="#contact"]')

    // Initial state
    const initialScrollPosition = await page.evaluate(() => window.scrollY)
    expect(initialScrollPosition).toBe(0)

    // Click the "Contact me" button
    await contactLink.click()

    // New scroll position
    const newScrollPosition = await page.evaluate(() => window.scrollY)
    expect(newScrollPosition).toBeGreaterThan(500)
  })

  test('opens gallery on image click', async ({ page }) => {
    const firstGalleryLink = page
      .locator('#team-projects .Gallery-link')
      .first()

    // Click the first gallery image
    await firstGalleryLink.click()

    // Wait for the gallery overlay
    await page.waitForSelector('.pswp.pswp--open')

    // Wait for the large gallery image
    await page.waitForSelector('.pswp__img')
  })

  test('expands and collapses gallery images', async ({ page }) => {
    const expanderButton = page.locator(
      '.Expander-button[aria-controls="team-projects"]',
    )

    // Initial state
    await expect(expanderButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expanderButton).toHaveText('Show more')

    // Click to expand
    await expanderButton.click()
    await expect(expanderButton).toHaveAttribute('aria-expanded', 'true')
    await expect(expanderButton).toHaveText('Show less')

    // Click to collapse
    await expanderButton.click()
    await expect(expanderButton).toHaveAttribute('aria-expanded', 'false')
    await expect(expanderButton).toHaveText('Show more')
  })
})
