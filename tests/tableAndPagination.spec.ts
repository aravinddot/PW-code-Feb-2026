import {test, expect} from '@playwright/test'



test('handling tables and pagination', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByRole('heading', {name: 'Filter Controls'})).toBeVisible()


    // const rowCount = await page.locator('tbody tr').count()

    // console.log("rowCount===>"+ rowCount);

    // const firstRow = await page.locator('tbody tr').first().allTextContents()
    
    // console.log("firstRow==>"+ firstRow);


    // const roleColumn = await page.locator('tbody tr td:nth-child(3)').allTextContents()
    
    // console.log("roleColumn==>"+ roleColumn);
    

})





test('extract all values in the table', async({page})=> {

    test.setTimeout(180000)

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByRole('heading', {name: 'Filter Controls'})).toBeVisible()


    const obj: {[key: string]: string[]} = {}

    await page.getByTestId('page-size-select').selectOption('100')

    const rowCount = await page.locator('tbody tr').count()

    console.log("rowCount===>"+ rowCount);

    const pagination = await page.getByTestId('pagination-current').textContent() || ''

    const splitted = pagination.split(' ')

    console.log("splitted===>"+ splitted[3]); // page  1  of  32 

    for(let i = 0; i < Number(splitted[3]); i++) {

        for(let j = 0; j < rowCount - 1; j++) {

            const row = await page.locator('tbody tr').nth(j).locator('td').allTextContents()

            const objKey = row[0]

            obj[objKey] = row
        }

        await page.getByTestId('pagination-next').click()
    }
    
console.log("object==>"+ JSON.stringify(obj));




    
    

})