
var appRouter = function(app,collection) {

    app.get("/", function(req, res) {
        res.send("Hello World");
    });

    app.get('/User/findAll', collection.findAllUser);

    app.get('/User/getNew', collection.getNewUser);

};

module.exports = appRouter;