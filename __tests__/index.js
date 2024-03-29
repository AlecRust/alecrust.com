const puppeteer = require('puppeteer')
const path = require('path')

describe('Tests', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    await page.goto(
      `file://${path.join(__dirname, '..', '/dist/index.html')}`,
      { waitUntil: 'networkidle0' },
    )
  })

  test('renders correctly', async () => {
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  })

  test('opens gallery on image click', async () => {
    await page.click('.Gallery-link:first-child')
    await page.waitForSelector('.pswp.pswp--open')
    await page.waitForSelector('.pswp__img')
  })
})
