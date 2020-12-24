const axios = require('axios');
const apiCalls = require('../http/apiCalls.js');

function ServicesController(){

    async function getAsgardianActiveLikes(){
        try {
            let asgardianActiveLikes = await apiCalls.fetchAsgardianActiveLikes();
            return asgardianActiveLikes;
        }catch(error){
            return [
                {
                    "error": true,
                    "errorMessage": error.message
                }
            ];
        }
    }
    return { getAsgardianActiveLikes };
}

module.exports = ServicesController();
