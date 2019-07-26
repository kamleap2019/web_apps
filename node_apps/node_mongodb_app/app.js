var mongodb = require('mongodb')

var mongoDbClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/myFirstMongoDB'

// { useNewUrlParser: true} is required for mongoDB version > 3.0
// Connect to the DB and passin a callback function that will be called upon a successful connection
mongoDbClient.connect(url, { useNewUrlParser: true}, function(err, db) {
    if (!err) {
        console.log("Database created and connection made");
        db.close();
    } else {
        console.log("Cannot connect to DB. Is the DB server running?");
    }
});
