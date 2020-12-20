const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'raven'
});

connection.connect();

connection.query('SELECT * FROM test', function(error, results, fields){
    if(error) throw error;
    console.log(results);
})
