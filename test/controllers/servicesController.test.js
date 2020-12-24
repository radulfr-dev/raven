jest.mock('../../http/apiCalls');
const servicesController = require('../../controllers/servicesController.js');

test('getAsgardianActiveLikes returns array of objects', async () => {
    let asgardianActiveLikes = await servicesController.getAsgardianActiveLikes();
    expect(asgardianActiveLikes).toEqual(
        expect.arrayContaining([
            expect.any(Object)
        ])
    );
});
