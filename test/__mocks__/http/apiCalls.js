const axios = require('axios');

function apiCalls(){
    function fetchAsgardianActiveLikes(){
        return Promise.resolve([
            {
                "supplier_name": "SmmLite",
                "service_code": 1,
                "service_number": 1688,
                "status": 1,
                "min_order": 20,
                "max_order": 15000,
                "price_per_1k": 2.85
            },
            {
                "supplier_name": "Smo",
                "service_code": 1,
                "service_number": 401,
                "status": 1,
                "min_order": 20,
                "max_order": 5000,
                "price_per_1k": 3
            }
        ]);
    }   
    return { fetchAsgardianActiveLikes};
}

module.exports = apiCalls();
