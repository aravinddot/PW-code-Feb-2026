import { test, expect } from '@playwright/test'

test('mock api response using route.fullFill', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/flags', async (route) => {

        await route.fulfill({
            body: JSON.stringify({
                source: "mocked-api",
                delayMs: 1598,
                flags: {
                    betaDashboard: "mocked-beta-dashboard",
                    aiInsights: false,
                    mcpAssist: "mocked-pilot-mode",
                    smartRetries: true
                },
                message: "mocked flags loaded from endpoint."
            })
        })
    })

    await page.getByTestId('net-flags-btn').click()
    await page.waitForTimeout(10000)


})



test('abort api response using route.abort', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/orders', route => route.abort())

    await page.getByTestId('net-orders-btn').click()
    await page.waitForTimeout(10000)
})



test('mock headers using route.continue', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/profile', async (route) => {
        const headers = {
            ...route.request().headers(),
            "x-intercept-source": "playwright-test"
        }
        await route.continue({ headers })
    })

    await page.getByTestId('net-continue-btn').click()
    await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/network/profile')
    await page.waitForTimeout(10000)



})