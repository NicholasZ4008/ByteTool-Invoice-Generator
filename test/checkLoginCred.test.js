const checkLoginCred = require('../functions/checkLoginCred');

test("returns false for no username provided", () => {
    expect(checkLoginCred.checkLoginCred(null,"password").toBe(false))
})