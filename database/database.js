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

    async function addUserToDatabase(userObject){

        connection.connect();

        const rows = await connection.query(`INSERT INTO users (username, password, role, email, authorized) VALUES ("${userObject.username}", "${userObject.password}", "${userObject.role}", "${userObject.email}", 1)`);

        return rows;

        connection.end();
    }

    return { addUserToDatabase };

}

module.exports = DatabaseController();
