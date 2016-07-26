
var db             = require('../db/db'),
    collectionName = 'user';

/**
 * get all users
 * @param req
 * @param res
 */
exports.findAll = function(req,res){
    var collection = db.get().collection(collectionName);

    collection.find().toArray(function(err, items) {
        res.send(items);
    });
};

/**
 * creates a new user object and returns user id to save in extension
 * @param req
 * @param res
 */
exports.getNew = function(req,res) {

    var newUser = {};
    console.log('Adding user: ' + JSON.stringify(newUser));

    var collection = db.get().collection(collectionName);

    collection.insert(newUser, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
            res.send(err);
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send({'userId' : result.insertedIds[0]});
        }
    });
};