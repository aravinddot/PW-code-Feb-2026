import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test'


test.describe('Auth handling', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async()=> {

        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()

        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForURL('https://testcms.reco-claims.ca', { timeout: 12000 })
        await page.locator('.rzi-circle-o-notch').waitFor({ state: 'detached', timeout: 15000 })

        await context.storageState({path: 'storage.json'})

        await browser.close()

    })


    test.beforeEach(async () => {
       
        browser = await chromium.launch()
        context = await browser.newContext({storageState: 'storage.json'})
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca')
        await page.waitForTimeout(5000)

    })

    test.afterEach(async()=> {
    
        await browser.close()
    })


    test('Verify the new claim button', async () => {

        await expect(page.getByText('New Claim', { exact: true })).toBeVisible()
        await page.waitForTimeout(5000)

    })


    test('Verify the New CD/CP Claim button', async () => {

        await expect(page.getByText('New CD/CP Claim', { exact: true })).toBeVisible()
        await page.waitForTimeout(5000)

    })


    test('Verify the upload Invoice', async () => {

        await expect(page.getByText('Upload Invoice', { exact: true })).toBeVisible()
        await page.waitForTimeout(5000)

    })


    test('Verify the search textbox', async () => {

        await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible()
        await page.waitForTimeout(5000)

    })










})