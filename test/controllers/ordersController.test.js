jest.mock('../../http/apiCalls');
const ordersController = require('./../../controllers/ordersController.js');
const servicesController = require('./../../controllers/servicesController.js');

test('calculateMinOrder should return 1000 when passed services with these min_order values: [50, 150, 100, 1000, 25, 100]', async () => {
    let services = await servicesController.getAsgardianActiveViews();
    let minOrder = ordersController.calculateMinOrder(services); 
    expect(minOrder).toEqual(1000);
});
