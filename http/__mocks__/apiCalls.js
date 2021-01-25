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

    function fetchAsgardianActiveViews(){
        return Promise.resolve([
            {
                "supplier_name": "SmmLite",
                "service_code": 4,
                "service_number": 860,
                "status": 1,
                "min_order": 50,
                "max_order": 2000000,
                "price_per_1k": 0.1
            },
            {
                "supplier_name": "Jap",
                "service_code": 4,
                "service_number": 3427,
                "status": 1,
                "min_order": 150,
                "max_order": 10000000,
                "price_per_1k": 0.04
            },
            {
                "supplier_name": "Smo",
                "service_code": 4,
                "service_number": 1878,
                "status": 1,
                "min_order": 100,
                "max_order": 1000000,
                "price_per_1k": 0.04
            },
            {
                "supplier_name": "Smo",
                "service_code": 4,
                "service_number": 2506,
                "status": 1,
                "min_order": 1000,
                "max_order": 50000,
                "price_per_1k": 0.077
            },
            {
                "supplier_name": "SmmLite",
                "service_code": 4,
                "service_number": 1461,
                "status": 1,
                "min_order": 25,
                "max_order": 250000000,
                "price_per_1k": 0.07
            },
            {
                "supplier_name": "SmmLite",
                "service_code": 4,
                "service_number": 765,
                "status": 1,
                "min_order": 100,
                "max_order": 900000,
                "price_per_1k": 0.07
            }
        ]);
    }

    function fetchAsgardianActiveSaves(){
        return Promise.resolve([
            {
                "supplier_name": "Jap",
                "service_code": 5,
                "service_number": 448,
                "status": 1,
                "min_order": 10,
                "max_order": 15000,
                "price_per_1k": 0.2
            },
            {
                "supplier_name": "Smo",
                "service_code": 5,
                "service_number": 1888,
                "status": 1,
                "min_order": 25,
                "max_order": 150000,
                "price_per_1k": 0.02
            }
        ]);
    }

    function fetchAsgardianActiveImpressions(){
        return Promise.resolve([
            {
                "supplier_name": "Jap",
                "service_code": 5,
                "service_number": 448,
                "status": 1,
                "min_order": 10,
                "max_order": 15000,
                "price_per_1k": 0.2
            },
            {
                "supplier_name": "Smo",
                "service_code": 5,
                "service_number": 1888,
                "status": 1,
                "min_order": 25,
                "max_order": 150000,
                "price_per_1k": 0.02
            }
        ]);
    }

    return { fetchAsgardianActiveLikes, fetchAsgardianActiveViews, fetchAsgardianActiveSaves, fetchAsgardianActiveImpressions };
}

module.exports = apiCalls();
