// TODO private || anonymous namespace

var mongo = require('mongodb');

var Server      = mongo.Server,
    Db          = mongo.Db,
    BSON        = mongo.BSONPure,
    MongoClient = mongo.MongoClient,
    state       = {db:null},
    ObjectId    = require('mongodb').ObjectID;

exports.connect = function(url, done) {
    //already connected to db
    if (state.db){
        return done();
    }

    MongoClient.connect(url, function(err, db) {
        if (err){
            return done(err);
        }

        state.db = db;

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

        done()
    })
};

exports.get = function() {
    return state.db
};

exports.idToObjectId = function(id){
    return new ObjectId(id);
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
};