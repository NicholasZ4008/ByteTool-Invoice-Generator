const checkEmailExist = require('../functions/checkEmailExist');

test("returns true for a db result provided", () => {
    var result = checkEmailExist({ "results": [null] });
    expect(result).toBe(false)
})

test("returns false for no password provided", () => {
    var result = checkEmailExist(null);
    expect(result).toBe(false)
})