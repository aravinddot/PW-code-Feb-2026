import {test, expect} from '@playwright/test'

const githubToken = process.env.GITHUB_TOKEN;
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;



test('Handle a Basic authetication', async({request})=> {
// security low
    const response = await request.get('https://postman-echo.com/basic-auth', {
        headers: {
            Authorization: `Basic ${Buffer.from('postman:password').toString('base64')}`
        }
    })

    console.log(await response.json());
    
})


test('Authenticate using Bearer token', async({request})=> {
    test.skip(!githubToken, 'Set GITHUB_TOKEN to run this test.');

    const response = await request.get('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    })

    console.log(await response.json());
    
})


test('How to autheticate API key', async({request})=> {
    test.skip(!openWeatherApiKey, 'Set OPENWEATHER_API_KEY to run this test.');


    const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: 'delhi',
            //appid: openWeatherApiKey
        }
    })

    console.log(await response.json());


})



// basic auth 

// https://postman-echo.com/basic-auth

// postman
// password


// github url 

// https://api.github.com/user/repos


// https://openweathermap.org/current#name
