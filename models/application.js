
var db             = require('../db/db'),
    collectionName = 'application';


exports.getStatus = function(req,res) {
    var collection = db.get().collection(collectionName);

    collection.findOne((function (err, application) {
        //res.send(items);
        if(application){
            res.send(application);
        }
        else{
            res.send({"active":false});
        }
    }));
};