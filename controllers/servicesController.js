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

    async function getAsgardianActiveViews(){
        try {
            let asgardianActiveViews = await apiCalls.fetchAsgardianActiveViews();
            return asgardianActiveViews;
        }catch(error){
            return [
                {
                    "error": true,
                    "errorMessage": error.message
                }
            ];
        }
    }

    async function getAsgardianActiveSaves(){
        try {
            let asgardianActiveSaves = await apiCalls.fetchAsgardianActiveSaves();
            return asgardianActiveSaves;
        }catch(error){
            return [
                {
                    "error": true,
                    "errorMessage": error.message
                }
            ];
        }
    }

    return { getAsgardianActiveLikes, getAsgardianActiveViews, getAsgardianActiveSaves  };
}

module.exports = ServicesController();
