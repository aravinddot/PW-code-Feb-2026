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

        // await page.getByTestId('file-upload-input').setInputFiles('uploads/test.txt')

        // await expect(page.getByText('test.txt uploaded successfully.')).toBeVisible()


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

        const download = await downloadFile
        const fileName = download.suggestedFilename()
        await download.saveAs(`downloads/${fileName}`)

        await expect(page.getByText('practice-report.pdf download started.')).toBeVisible()

    })



})