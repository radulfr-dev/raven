const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


function DatabaseController(){

    function testConnection(){
        //
        // Test connection
        connection.connect();

        connection.query('SELECT * FROM test', function(error, results, fields){
            if(error) throw error;
            console.log(results);
        });

        connection.end();

    }

    function addUserToDatabase(userObject){

        connection.connect();

        connection.query(`INSERT INTO users (username, password, role, email, authorizaton) VALUES (${userObject.username}, ${userObject.password}, ${userObject.role}, ${userObject.email}, 1)`, function(error, results, fields){
            if(error){
                return {
                    'status': 'error',
                    'errorMessage': error
                };
            }

            return {
                'status': 'success',
                'message': results.changedRows
            };
        });

        connection.end();
    }

    return { addUserToDatabase };

}
