import {test, expect} from '@playwright/test'

test.describe('multiple inputs tests', ()=> {


    const users = [
        {userName: 'standard_user', password: 'secret_sauce', expected: 'Sauce Labs Backpack'},
        {userName: 'problem_user', password: 'secret_sauce', expected: 'Sauce Labs Bike Light'}
    ]

    for(const user of users) {

        test(`Validate the cart name ${user.userName}`, async({page})=> {

            await page.goto('https://www.saucedemo.com/')

            await page.getByPlaceholder('Username').fill(user.userName)
            await page.getByPlaceholder('Password').fill(user.password)
            await page.locator('[id="login-button"]').click()
            await expect(page.getByText(user.expected)).toBeVisible()

        })





    }




})