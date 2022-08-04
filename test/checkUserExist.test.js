const checkUserExist = require('../functions/checkUserExist');

test("returns true for a db result provided", () => {
    var result = checkUserExist({ "results": [null] });
    expect(result).toBe(false)
})

test("returns false for no password provided", () => {
    var result = checkUserExist(null);
    expect(result).toBe(false)
})