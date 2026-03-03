import { test, expect } from '@playwright/test'



///https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic

test.describe('Interactive Playwright Sandbox Basic', () => {


    test('Click, Double Click, Hover, Tooltip, Static Dropdown', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')
        await page.getByTestId('single-click-btn').click()
        await expect(page.getByText('Single click completed.')).toBeVisible()
        await expect(page.getByTestId('single-click-status')).toContainText('Single click completed.')
        await page.getByTestId('double-click-btn').dblclick()
        await expect(page.getByText('Double click completed.')).toBeVisible()
        await page.getByTestId('hover-btn').hover()
        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()
        await page.getByTestId('tooltip-trigger-btn').hover()
        await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')
        await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')
        await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible()
    })


    test('Inputs, Checkbox, Radio, Dropdown', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const name = 'Playwright'
        const mailId = 'info@playwrightmasteryacademy.com'
        const dropdownValue = 'Playwright Core'

        await page.getByTestId('name-input').fill(name)
        await page.getByTestId('email-input').fill(mailId)
        await page.getByTestId('track-select').selectOption(dropdownValue)
        await page.getByTestId('remember-checkbox').check()
        await page.getByTestId('mode-api-radio').check()
        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${mailId}) for ${dropdownValue}.`)).toBeVisible()


    })


    test('Dynamic Waits, Keyboard', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('async-load-btn').click()

        await page.waitForTimeout(20000)

        await expect(page.getByText('Async result loaded successfully.')).toBeVisible({ timeout: 25000 })

        await page.getByTestId('keyboard-input').fill('Playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        await expect(page.getByText('Command submitted: Playwright')).toBeVisible()
    })


    test('Text and Attribute Extraction', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        // extract only visible text in UI
        const innerTextvalue = await page.getByTestId('extract-textcontent-target').innerText()

        console.log("innerTextvalue==>" + innerTextvalue);

        // extract all texts if it is hidden 
        const textContentValue = await page.getByTestId('extract-textcontent-target').textContent()

        console.log("textContentValue==>" + textContentValue);

        const inner = await page.getByTestId('extract-inputvalue-target').innerText()

        const text = await page.getByTestId('extract-inputvalue-target').textContent()

        console.log("inner===>"+ inner);
        console.log("text===>"+ text);

        const inputVal = await page.getByTestId('extract-inputvalue-target').inputValue()
        console.log("inputVal==>"+ inputVal);

        const attrValue = await page.getByTestId('extract-attribute-target').getAttribute('class')
        console.log("attrValue===>"+ attrValue);

        const allInnerText = await page.getByTestId('extract-list-item').allInnerTexts()

        const allTextContent = await page.getByTestId('extract-list-item').allTextContents()

        console.log("allInnerText===>" + allInnerText);
        console.log("allTextContent===>" + allTextContent);
    })








})