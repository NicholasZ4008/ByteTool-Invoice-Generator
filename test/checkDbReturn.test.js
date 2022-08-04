const checkDbReturn = require('../functions/checkDbReturn');

test("returns true for a db result provided", () => {
    var result = checkDbReturn({"results":[1]});
    expect(result).toBe(true)
})

test("returns false for no db result provided", () => {
    var result = checkDbReturn(null);
    expect(result).toBe(false)
})