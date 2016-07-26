
var db             = require('../db/db'),
    collectionName = 'logins';


/**
 * creates new login object
 * @param data
 */
exports.createLogin = function(res,data){
    var newLogin   = data,
        collection = db.get().collection(collectionName);

    collection.insert(newLogin,{safe:true}, function(err, result){
        if (err) {
            res.send({'error':'An error has occurred'});
            res.send(err);
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send({'login id' : result.insertedIds[0]});
        }
    });
};


/**
 * get all logins
 * @param req
 * @param res
 */
exports.findAll = function(req,res){
    var collection = db.get().collection(collectionName);

    collection.find().toArray(function(err, items) {
        res.send(items);
    });
};