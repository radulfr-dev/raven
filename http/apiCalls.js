const axios = require('axios');

function apiCalls(){
    function fetchAsgardianActiveLikes(){
        return new Promise((resolve, reject) => {
            axios.get('https://asgard.goso.space/api/services/1/1')
                .then(function(response){
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
        });
    }   
    return { fetchAsgardianActiveLikes };
}

module.exports = apiCalls();
