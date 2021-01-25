const axios = require('axios');
const apiCalls = require('../http/apiCalls.js');

function ServicesController(){

    async function getAsgardianActiveLikes(){
        try {
            let asgardianActiveLikes = await apiCalls.fetchAsgardianActiveLikes();
            return asgardianActiveLikes.data;
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
            return asgardianActiveViews.data;
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
            return asgardianActiveSaves.data;
        }catch(error){
            return [
                {
                    "error": true,
                    "errorMessage": error.message
                }
            ];
        }
    }
    
    async function getAsgardianActiveImpressions(){
        try {
            let asgardianActiveImpressions = await apiCalls.fetchAsgardianActiveImpressions();
            return asgardianActiveImpressions.data;
        }catch(error){
            return [
                {
                    "error": true,
                    "errorMessage": error.message
                }
            ];
        }
    }

    return { getAsgardianActiveLikes, getAsgardianActiveViews, getAsgardianActiveSaves, getAsgardianActiveImpressions };
}

module.exports = ServicesController();
