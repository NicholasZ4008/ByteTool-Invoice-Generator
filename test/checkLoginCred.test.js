const checkLoginCred = require('../functions/checkLoginCred');

test("returns false for no username provided", () => {
    var result = checkLoginCred(null, "password");
    expect(result).toBe(false);
})

test("returns false for no password provided", () => {
    var result = checkLoginCred("username", null);
    expect(result).toBe(false);
})

test("returns false for no user and pass provided", () => {
    var result = checkLoginCred(null, null);
    expect(result).toBe(false);
})

test("returns true for user and pass provided", () => {
    var result = checkLoginCred("username", "password");
    expect(result).toBe(true);
})