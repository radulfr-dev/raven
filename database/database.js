const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
});

function DatabaseController(){

    async function addUserToDatabase(userObject){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `INSERT INTO users (username, password, role, email, authorized) VALUES ("${userObject.username}", "${userObject.password}", "${userObject.role}", "${userObject.email}", 1)`;

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }catch(error){
            throw error;
        }
    }

    async function checkDatabaseForUsername(username){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE username = "${username}"`;

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        }catch(error){
            return error;
        }
    }

    return { addUserToDatabase, checkDatabaseForUsername };

}

module.exports = DatabaseController();
