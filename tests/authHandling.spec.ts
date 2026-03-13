import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test'

test.describe('Authetication Handling to skip multiple login', async () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;


    test.beforeAll(async () => {

        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()

        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(10000)
        await page.waitForURL('https://testcms.reco-claims.ca', {timeout: 120000})
        await context.storageState({ path: 'storage.json' })
        await browser.close()
    })

    test.beforeEach(async () => {
        browser = await chromium.launch()
        context = await browser.newContext({ storageState: 'storage.json' })
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca')

    })

    test.afterEach(async()=> {
        await page.close()
        await context.close()
    })


    test('Validate the user name', async () => {

        await page.locator('thead').getByText('Claim #').hover()

        await page.getByRole('link', { name: 'navigate_next' }).dblclick()
        await page.waitForTimeout(10000)
    })

    test('Validate Headers', async () => {

        await page.locator('thead').getByText('Claim #').hover()

        await page.getByRole('link', { name: 'navigate_next' }).dblclick()
        await page.waitForTimeout(10000)

    })
















})