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

    test('handle alert dialog', async ({ page }) => {
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


    test('Handle new tab', async () => {
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
        await page.bringToFront()
        await expect(page.getByText('Drag and Drop + File Upload/Download')).toBeVisible()
        await newPage.waitForTimeout(10000)
    })


    test('Handle new tab direct link blocked', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('popup-right-click-link').click()
        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()

        const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

        console.log("link==>" + link);

        const pageTwo = await context.newPage();

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${link}`)

        expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()

        await pageTwo.waitForTimeout(3000)


    })




    test('isolated context', async () => {
        test.setTimeout(180000)
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(10000)


        const contextTwo = await browser.newContext()
        const pageTwo = await contextTwo.newPage()
        await pageTwo.goto('https://testcms.reco-claims.ca/Login')
        await pageTwo.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await pageTwo.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await pageTwo.getByRole('button', { name: 'Login' }).click()
        await pageTwo.waitForTimeout(10000)


        const cookie = await context.cookies()
        const cookieTwo = await contextTwo.cookies()

        console.log("cookie===>" + JSON.stringify(cookie));
        console.log("cookieTwo===>" + JSON.stringify(cookieTwo));

    })


    test('Handling Drag and Drop ', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

        await expect(page.getByText('Drop completed successfully.')).toBeVisible()

    })


    test('Handling File Upload ', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('file-upload-input').setInputFiles('uploads/test.txt')

        await expect(page.getByText('test.txt uploaded successfully.')).toBeVisible()


        await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-data.csv', 'uploads/practice-report (1).pdf'])

        await expect(page.getByText('2 files uploaded: practice-data.csv, practice-report (1).pdf.')).toBeVisible()

    })




    test('Handling File Download ', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        //getByTestId('download-pdf-btn')

        const [downloadFile] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-pdf-btn').click()
        ])

        //const download = await downloadFile
        const fileName = await downloadFile.suggestedFilename()
        await downloadFile.saveAs(`downloads/${fileName}`)

        await expect(page.getByText('practice-report.pdf download started.')).toBeVisible()

    })



    //practice-iframe



    test('Handling Iframe', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const iframe = await page.frameLocator('#practice-iframe')

        await iframe.locator('#frame-input').fill('Playwright')

        await iframe.locator('#frame-save').click()

        await expect(iframe.locator('#frame-result')).toContainText('Playwright saved')

    })



    test('Handling shadow DOM', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const shadow = await page.getByTestId('shadow-host')

        await shadow.locator('#shadow-input').fill('Playwright')

        await shadow.locator('#shadow-save').click()

        await expect(shadow.getByText('Result: Playwright saved')).toBeVisible()

    })





    test('Practice and Interview Dates', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('practice-date-picker').type('01-11-1995')

        await expect(page.getByText('Practice Date Selected: 1995-11-01')).toBeVisible()

        await page.getByTestId('practice-date-picker').fill('1995-11-01')

        await expect(page.getByText('Practice Date Selected: 1995-11-01')).toBeVisible()

        const datePicker = await page.getByTestId('interview-date-picker')

        await datePicker.evaluate((dom, val) => {

            const html = dom as HTMLInputElement
            html.value = val as string
            html.dispatchEvent(new Event('input'))
            html.dispatchEvent(new Event('change'))

        }, "1995-11-01")

        await expect(page.getByText('Interview Date Selected: 1995-11-01')).toBeVisible()

    })





    test('wait commands', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        //waitForUrl
        await page.getByTestId('wait-navigation-link').click()
        await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')
        await expect(page.getByText('Popup Opened Successfully')).toBeVisible({ timeout: 50000 })

        //waitForResponse
        await page.getByTestId('wait-response-btn').click()
        await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')
        await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        //waitFor
        await page.getByTestId('wait-response-btn').click()
        await page.getByText('Trigger API Response Completed').waitFor({ state: 'visible' })
        await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        // hidden - locator hidden in DOM should not be visible
        // attached - locator exists in DOM
        // detached - locator should not exists in DOM and should not be visible

        //waitForSelector
        await page.getByTestId('wait-response-btn').click()
        await page.waitForSelector("//*[contains(text(),'Trigger API Response Completed')]")
        await expect(page.getByText('Trigger API Response Completed')).toBeVisible()



        //load - DOM ready, images loaded, speed - medium
        await page.getByTestId('wait-loadstate-practice-load-btn').click();
        await page.waitForLoadState('load')
        await expect(page.getByText('Test load State: Completed')).toBeVisible()

        //DomContentLoaded - DOM ready, speed - fastest
        await page.getByTestId('wait-loadstate-practice-dom-btn').click();
        await page.waitForLoadState('domcontentloaded')
        await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()

        //networkIdle - DOM ready, images loaded, API calls finished, speed - slow
        await page.getByTestId('wait-loadstate-practice-networkidle-btn').click();
        await page.waitForLoadState('networkidle')
        await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()


    })


    test('mouse actions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('mouse-downup-target').hover()

        await page.mouse.down()

        await expect(page.getByText('Mouse down detected.')).toBeVisible()

        await page.mouse.up()

        await expect(page.getByText('Mouse down + up detected.')).toBeVisible({ timeout: 30000 })


        await page.getByText('Mouse Actions').scrollIntoViewIfNeeded()
        await page.waitForTimeout(2000)


        await page.getByTestId('mouse-rightclick-target').click({ button: 'right' })
        await expect(page.getByText('Right click detected on target.')).toBeVisible()

        await page.getByTestId('mouse-wheel-target').hover()
        await page.mouse.wheel(0, 300)
        await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()

    })



    test('force actions', async ({ page }) => {

        // actions - click, dblclick, hover, check, uncheck, dragTo

        // Attached to the DOM
        // Visible
        // Stable 
        // enable
        // not covered by another element
        // expect(page.getByText('mouse actions')).toBeVisible()
        // await page.getByText('mouse actions').click()

        // avoid

        // UI bugs
        // clicking wrong element unintentionally


    })



    test('element screenshot and page screenhot', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('wait-response-btn').screenshot({ path: 'screenshots/element.png' })

        await page.screenshot({ path: 'screenshots/page.png', fullPage: true })

    })


    test('retrying and non retrying assertions', async ({ page }) => {

        // retrying assertions - 5 secs -


        // visibility & state

        // expect('locator').toBeVisible()
        // expect('locator').toBeHidden()
        // expect('locator').toBeEnabled()
        // expect('locator').tobeDisabled()
        // expect('locator').toBeEditable()
        // expect('locator').toBeChecked()
        // expect('locator').toBeFocused()

        // // Text

        // expect('locator').toHaveText('exact text')
        // expect('locator').toContainText('text')
        // expect('locator').toHaveValue('input value')
        // expect('locator').toHaveAttribute('attribute value')
        // expect('locator').toHaveClass('active')
        // expect('tableLocator')toHaveCount(20)

        // // page

        // expect('page').toHaveTitle('title')
        // expect('page').toHaveUrl('url')



        // // non retrying assertions - matching with value


        // const number = 6
        // expect(number).toBe(5) // pass

        // expect(number).toEqual(6)

        // expect(number).toStrictEqual(6)

        // expect(true).toBeTruthy()

        // expect(false).toBeFalsy()

        // expect(null).toBeNull()

        // expect(undefined).toBeUndefined()

        // expect(10).toBeGreaterThan(20)

        // expect(10).toBeLessThan(20)

        // expect(10).toBeGreaterThanOrEqual(20)

        // expect(10).toBeLessThanOrEqual(20)

        // expect(10).toContain([10, 20, 30])



// negating assertions

//expect().not.tobevisible()














    })



    test('assertions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const value = await page.locator('h3').nth(1).textContent()
        console.log("value===>" + value);


        // non retrying assertions
        expect(value).toBe('Dialogs and Popup')

        // retrying assertions
        expect(page.locator('h3').nth(1)).toContainText('Dialogs and Popup')
    })





    test('Hard vs soft assertions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('dynamic-group-select').selectOption('Locators')
        await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')

        await expect.soft(page.getByText('Dynamic dropdown selected: getByRole + name. playwright')).toBeVisible()


        await page.getByTestId('bootstrap-dropdown-trigger').click();
        await expect(page.getByTestId('bootstrap-dropdown-menu')).toBeVisible()
        await page.getByText('Weekday Batch').click();
        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()

    })





})