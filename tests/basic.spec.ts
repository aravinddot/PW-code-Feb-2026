import { test, expect } from '@playwright/test'

// grouping Tests
test.describe('Basic Element Handling and Assertions', () => {


    test('Handle Goto, Fill, type, Click,', async ({ page }) => {
        await page.goto('https://testcms.reco-claims.ca/Login')
        // set a value into textbox
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        // type a value
        //    await page.getByRole('textbox', { name: 'Username' }).type('info+programmanager@xlgclaims.com')
        //    await page.getByRole('textbox', { name: 'Password' }).type('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(10000)
    })

    test('Handle clear, hover, dblClick - assertion - toHaveUrl, toContain', async ({ page }) => {
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('textbox', { name: 'Username' }).clear()
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(10000)
        await expect(page).toHaveURL('https://testcms.reco-claims.ca')
        const url = page.url()
        console.log("url===>" + url);
        await expect(url).toContain('https://testcms.reco-claims.ca')

        await page.locator('thead').getByText('Claim #').hover()

        await page.getByRole('link', { name: 'navigate_next' }).dblclick()
        await page.waitForTimeout(10000)
    });


    test('Handle focus, press', async ({ page }) => {
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).focus()

        await page.getByRole('button', { name: 'Login' }).press('Enter')
        // Enter, Tab, Escape, Backspace, Delete, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, a, b,c , 1, 2, 3, Control+A, Control+C, Shift+Tab
        await page.waitForTimeout(10000)
    })


    test('Handle - radio, checkbox, assert - toHaveValue, toBeChecked, .not.toBeChecked', async ({ page }) => {
        await page.goto('https://automationexercise.com/login')
        await page.getByRole('textbox', { name: 'Name' }).fill('Testing User')
        await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Testing User')
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('Testingabcd123@gmail.com')
        await page.getByRole('button', { name: 'Signup' }).click();
        await expect(page.url()).toContain('signup')
        const genderOne = page.getByRole('radio', { name: 'Mr.' })
        const genderTwo = page.getByRole('radio', { name: 'Mrs.' })
        await genderOne.check()
        await expect(genderOne).toBeChecked()
        await expect(genderTwo).not.toBeChecked()

    })





})