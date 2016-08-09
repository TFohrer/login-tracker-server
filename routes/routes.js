
var appRouter = function(app,db) {

    var User   = require('../models/user'),
        Logins = require('../models/logins');

    app.get("/", function(req, res) {
        res.send("Login Tracker Server");
    });
    // User
    app.get("/user/findAll", User.findAll);
    app.get("/user/getNew", User.getNew);
    app.get("/user/:userId/formFilled",User.filledForm);
    app.post("/user/formSubmit",User.submitForm);

    //Login
    app.post("/logins",function(req,res){
        Logins.createLogin(res,req.body);
    });
    app.get("/logins/findAll", Logins.findAll);


};

module.exports = appRouter;