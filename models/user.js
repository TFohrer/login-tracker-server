
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

/**
 * check if user filled form
 * @param req
 * @param res
 */
exports.filledForm = function(req,res){

    var userObjectId = db.idToObjectId(req.params.userId);

    db.get().collection(collectionName).findOne({_id:userObjectId},function(err,user){
        if(user){

            var filledForm = user.survey != undefined;
            res.send(filledForm);
        }
        else{
            res.sendStatus(500);
            res.send('no user found for id :' + req.params.userId);
        }
    });
};

/**
 *
 * @param req
 * @param res
 */
exports.submitForm = function(req,res){
    console.log(JSON.stringify(req.body));
    var userId = req.body.userId;

    delete req.body.userId;

    if(userId){
        var userObjectId = db.idToObjectId(userId);

        db.get().collection(collectionName).update({_id:userObjectId},{
            survey: req.body
        });

    }

    res.send(req.body);
};