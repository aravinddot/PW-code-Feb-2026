import {test, expect} from '@playwright/test'
import fs from 'fs'
import {parse} from 'csv-parse/sync'
import XLSX from 'xlsx'
import testData from '../test-data/jsonData.json'

test.describe('Data driven tests', ()=> {


test('read data from json', async({page})=> {

    // const data = fs.readFileSync('test-data/jsonData.json')

    // console.log("data===>"+ data);

    console.log("testdata==>"+ JSON.stringify(testData));
    

})


test('read data from CSV file', async({page})=> {

    type userData = {
        username: string,
        password: string,
        index: number,
        expected: string
    }


    const file = fs.readFileSync('test-data/users.csv')

    const data: userData[] = parse(file, {
        columns: true
    })

    // console.log("data==>"+ JSON.stringify(data));
    
    console.log(data[0].username);
    


})

test.only('read data from excel', async({page})=> {


const file = XLSX.readFile('test-data/Book1.xlsx')

const sheet = file.Sheets['Sheet1']

// const data = XLSX.utils.sheet_to_json(sheet)

// console.log("data==>"+ JSON.stringify(data));

const cellValue = sheet['A3'].v

console.log("cellValue==>"+ cellValue);




})






})