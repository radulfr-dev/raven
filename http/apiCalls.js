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

    function fetchAsgardianActiveViews(){
        return new Promise((resolve, reject) => {
            axios.get('https://asgard.goso.space/api/services/4/1')
                .then(function(response){
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
        });
    }   

    function fetchAsgardianActiveSaves(){
        return new Promise((resolve, reject) => {
            axios.get('https://asgard.goso.space/api/services/5/1')
                .then(function(response){
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
        });
    }   

    function fetchAsgardianActiveImpressions(){
        return new Promise((resolve, reject) => {
            axios.get('https://asgard.goso.space/api/services/6/1')
                .then(function(response){
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
        });
    }   
    return { fetchAsgardianActiveLikes, fetchAsgardianActiveViews, fetchAsgardianActiveSaves, fetchAsgardianActiveImpressions };
}

module.exports = apiCalls();
