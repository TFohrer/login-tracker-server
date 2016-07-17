
var appRouter = function(app,collection) {

    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    // User
    app.get("/user/findAll", collection.findAllUser);
    app.get("/user/getNew", collection.getNewUser);

    //Login
    app.post("/logins",function(req,res){
        collection.createLogin(res,req.body);
    })

};

module.exports = appRouter;