const checkUpdateClient = require('../functions/checkUpdateClient');

test("returns true for a db result provided", () => {
    var result = checkUpdateClient({ "results": [null] });
    expect(result).toBe(false)
})

test("returns false for no password provided", () => {
    var result = checkUpdateClient(null);
    expect(result).toBe(false)
})