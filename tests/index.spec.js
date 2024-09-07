// @ts-check
const { test, expect } = require('@playwright/test')
const path = require('path')

test.describe('Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`file://${path.join(__dirname, '..', '/dist/index.html')}`)
  })

  test('renders correctly', async ({ page }) => {
    const image = await page.screenshot()
    expect(image).toMatchSnapshot('render-snapshot.png')
  })

  test('opens gallery on image click', async ({ page }) => {
    await page.click('.Gallery-link:first-child')
    await page.waitForSelector('.pswp.pswp--open')
    await page.waitForSelector('.pswp__img')
  })
})
