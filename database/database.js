const mysql = require('mysql');
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect();

connection.query('SELECT * FROM test', function(error, results, fields){
    if(error) throw error;
    console.log(results);
})
