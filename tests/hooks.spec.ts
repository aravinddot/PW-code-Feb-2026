import { test, expect } from '@playwright/test'

test.beforeAll(() => {          // 1
    console.log("outer before all executed");
})

test.afterAll(() => {       // 5
    console.log("outer after all executed");
})

test.beforeEach(() => {             // 2
    console.log("outer before each executed");
})

test.afterEach(() => {          // 4
    console.log("outer after each executed");
})

  test('test case 1', async () => {           // 3
        console.log("test case 1 executed");
    })


test.describe('basic test', () => {

    test.beforeAll(() => {          // 1
        console.log("inner before all executed");
    })

    test.afterAll(() => {       // 5
        console.log("inner after all executed");
    })

    test.beforeEach(() => {             // 2
        console.log("inner before each executed");
    })

    test.afterEach(() => {          // 4
        console.log("inner after each executed");
    })


    test('test case 1', async () => {           // 3
        console.log("test case 1 executed");
    })

    test('test case 2', async () => {
        console.log("test case 2 executed");
    })
})


// beforeAll - runs only 1 time before all the test cases
// afterAll - run only 1 time after all the test cases
// beforeEach - runs every test case before
// afterEach - runs every test case after