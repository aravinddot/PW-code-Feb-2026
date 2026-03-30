import { test, expect } from '@playwright/test'


test('Get all products lists using GET Method', async ({ request }) => {

    // safer method - idempotent
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

    expect(body[0]).toHaveProperty('name')
    expect(body[0].name.length).toBeGreaterThan(0)
    expect(body[0].name.length).toBeDefined()

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

// PUT - Update an entire resourse


test('Update an entire resource using PUT Method', async ({ request }) => {

    const response = await request.put('http://localhost:3000/products/3', {
        data: {
            name: "PUT",
            price: "put price",
            category: {
                usertype: {
                    usertype: "put userType"
                },
                category: "put category"
            },
            id: 3
        }
    })

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')

    console.log(await response.json());

})



test('Delete a resource using DELETE Method', async ({ request }) => {


    const response = await request.delete('http://localhost:3000/products/3')

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')

})


test('Update a partial value using PATCH Method', async ({ request }) => {

    const response = await request.patch('http://localhost:3000/products/4', {
        data: {
            name: "PATCH"

        }
    })

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')

    console.log(await response.json());


})








