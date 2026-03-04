import { test, expect, chromium, firefox } from '@playwright/test'


test.describe('Interactive Playwright Sandbox Advanced', () => {

    test('Dynamic Dropdown, Hidden Dropdown and Bootstrap Dropdown', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('dynamic-group-select').selectOption('Locators')
        await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')
        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()
        await page.getByTestId('bootstrap-dropdown-trigger').click();
        await expect(page.getByTestId('bootstrap-dropdown-menu')).toBeVisible()
        await page.getByText('Weekday Batch').click();
        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()
    })

    test.only('handle alert dialog', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept()
        })

        await page.getByTestId('alert-btn').click()

         page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss()
        })
        await page.getByTestId('confirm-btn').click()
        await expect(page.getByText('Confirm dismissed.')).toBeVisible()

        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept('Playwright')
        })
        await page.getByTestId('prompt-btn').click()
        await expect(page.getByText('Prompt value: Playwright')).toBeVisible()
    })


    test('Handle new tab', async()=> {

        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByTestId('popup-link').click()
        ]);

        expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

        await newPage.waitForTimeout(10000)

        // await page.getByTestId('popup-link').click()

        // await page.waitForTimeout(10000)



    })


})