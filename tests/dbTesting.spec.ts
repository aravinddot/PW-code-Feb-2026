import {test, expect} from '@playwright/test'
import {pool} from '../utils/dbUtils'


test('connect to database and run query', async()=> {

    const result = await pool.query('select * from products')

    //console.log(result);
    
    //console.log(result.rowCount);
    //console.log(result.rows);

    const rows = result.rows

    for(const row of rows) {
        //console.log("row==>");
        console.log(row.product_name);
    }
    


})