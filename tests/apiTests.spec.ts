import { test, expect } from '@playwright/test'


test('Get all products lists using GET Method', async ({ request }) => {


    const response = await request.get('http://localhost:3000/products')

    //console.log(response);

    // console.log(response.status());
    // console.log(response.statusText());
    // console.log(response.headers()['content-type']);

    const body = await response.json();

    console.log(body);

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')

    expect(body[0].name).toBe("Blue Top")
    expect(body[1].price).toBe("Rs. 400")
    const arr = ['Women', 'Men']

    expect(arr).toContain(body[0].category.usertype.usertype)


})


test('Create a new resourse using POST Method', async ({ request }) => {

    const response = await request.post('http://localhost:3000/products', {
        data: {
            name: "POST",
            price: "post price",
         
            category: {
                usertype: {
                    usertype: "post userType"
                },
                category: "post category"
            }
        }
    })

    const body = await response.json()

    console.log(body);
    

    expect(response.status()).toBe(201)
    expect(response.statusText()).toBe('Created')
    expect(body.name).toBe('POST')


})