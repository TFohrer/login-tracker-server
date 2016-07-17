
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('login-tracker', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'login-tracker' database");
        db.collection('user', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'user' collection doesn't exist. Creating it ...");
                //populateDB();
            }
        });

        db.collection('logins', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'login' collection doesn't exist. Creating it ...");
                //populateDB();
            }
        });
    }
    else{
        console.log(err);
    }
});

/**
 * get all users
 * @param req
 * @param res
 */
exports.findAllUser = function(req,res){
    db.collection('user', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/**
 * creates a new user object and returns user id to save in extension
 * @param req
 * @param res
 */
exports.getNewUser = function(req,res) {

    var newUser = {};
    console.log('Adding user: ' + JSON.stringify(newUser));

    db.collection('user', function(err, collection) {
        collection.insert(newUser, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send({'userId' : result.insertedIds[0]});
            }
        });
    });
};

/**
 * creates new login object
 * @param data
 */
exports.createLogin = function(res,data){
    var newLogin = data;

    db.collection("logins", function(err,collection){
        collection.insert(newLogin,{safe:true}, function(err, result){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send({'login id' : result.insertedIds[0]});
            }
        });
    });
};



