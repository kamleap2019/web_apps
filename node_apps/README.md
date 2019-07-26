#Introduction
This repo/folder contains basic node based web apps. Refernce apps will be kept in separate branches here.

##[Node.js](https://nodejs.org/en/) Apps
Node.js allows us to write server-side javascript based applications with async event handling using Chrome's V8 [(src)])(https://github.com/v8/v8) JavaScript engine.

###[JavaScript](https://www.javascript.com/) App Properties
+ JavaScript apps are single threaded. The JavaScript app can have only one thread of execution
+ JavaScript runs in a Browser on client side
+ The Browser's JavaScript engine (i.e. the client) interprets the code side.

All of the above JavaScript execution model limitations are worked out by Node by providing a runtime and thus allowing to right apps on the server side with concurrent event handling.

### [Express](https://expressjs.com/) Framework for Node Apps
Express[(src)](https://github.com/expressjs/express) minimalist framework to write node apps. This is the most popular Node web framework and a lot of other packages are built on top of this. It's not part of Node but is almost considered like that.

### [MongDB](https://www.mongodb.com/) Database for Node Apps
MogoDB [(src)](https://github.com/mongodb/mongo) is a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database. The major type of a NoSQL DB [(git topic)](https://github.com/topics/nosql) is a [document oriented database](https://en.wikipedia.org/wiki/Document-oriented_database) aka a document store [(see other types)](https://www.mongodb.com/nosql-explained). Document oriented means that the data is semi structured in the documents. Many document format can be used but [JSON](http://json.org/) is probably the most common document format used in web apps. MongoDB uses JSON. (_Note: Internally MongoDB stores JSON in binary format called BSON_).

### [NPM](https://www.npmjs.com/) _Node Package Manager_
npm [(src)](https://github.com/npm/cli) The tool for managing node modules. ```npm install``` is a command that is needed often.

### [Yarn](https://yarnpkg.com/en/)
yarn [(src)](https://github.com/yarnpkg/yarn/) is similar to npm but with better dependency management. It's getting more popular for larger projects due to stronger required module version management.

## Creating a Node.js App


### What is needed for a Node.js app
In its simplest form, nothing excpet that node.js should be installed on your system. [link to install](https://nodejs.org/en/download/). But it's important to understand once again that using node.js we write server side applications. So we need to have a webserver, which will come with node's installation.

In each application we create an instance of the server and then start listening on that. Period.

### The first node.js app (Welcome Humans)
To keep it simple, all of the below stuff is done from a terminal (aka cli=command line interface).

1. Create a directory for the app. ```mkdir my_first_node_app; cd my_first_node_app```
2. Create a java script file in the directory. In the directory create a javascript file. ```touch app.js```
_You can name is anything but the convention is to name it as app.js. This will be important when we start using many tools/scripts for npm that assume the main entry point file for the application named like that_
3. Open the file using whatever editor you prefer ```vi app.js``` and paste the below code in that file. This code is based upon nodejs.org guide from [here](https://nodejs.org/en/docs/guides/getting-started-guide/)
```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bismillah, Welcome Humans\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

In the app we specify the to get http package to start an HTTP web server. This is the first statement in the app i.e. ```required('http')```  (_Note: when using frameworks this gets hidden_).

We then creating an instance of the server with a hostname and port number using ```http.createServer```.
All that is left after creating the instance is to listen for the request on the specified URL (i.e. in http://hostname:port format)

4. Start the app (i.e. launch the webserver) on your system using ```node app.js```. It will launch the webserver and show the server URL.
5. Using a browser (for this example, on the same system) goto the URL that was shown to you as the output of ```node app.js```. For the example above it should be http://127.0.0.1:3000/. When you open a URL in browser a get request it sent to the server and then it replies back with the message, which you see in the browser.

Congratulations on your first node.js app.

### The first Express based node.js app (Humans Explore)
When using frameworks from node packages we need to manage dependencies and that is done with the help of a package.json file. So any node app practically should initialize a package. In other words the first node app is really for exploring basic concepts and not a very practicaly way to write node apps.

1. Create a directory for the app and chage to that. ```mkdir node_express_app; cd node_express_app```.
2. Create the node app package by running ```npm init```. It will ask you some question. You can hit just enter for each of them but to follow the convention make sure to provide a name for for the entry point as **app.js**. The nod_expres_app will contain a **package.json** file now.
3. Install the _express_ node package as dependency for the app by running ```nppm install express```. This will create **node_modules** subdirectory and **package-lock.json** file. It will also **modify package.json** to add a dependencies section.
  (_Note: You don't need to any other parameter like --save to npm install. That was something required until node 5 to save the version numbers of the dependencies. Not needed any more_)
4. Create a java script file in the directory. In the directory create a javascript file. ```touch app.js```
5. Open the file using whatever editor you prefer e.g. ```vi app.js``` and paste the below code in that file. This code is based upon express.js  guide from [here](https://expressjs.com/en/starter/hello-world.html)
```
var expressPack = require('express');
const app = expressPack();
const port = 3000;

app.get('/', (req, res) => res.send('Humans Explore!'))

app.listen(port, () => console.log ('Server running on localhost at port ${port}!'))
```
6. Start the app (i.e. launch the webserver) on your system using ```node app.js```. It will launch the webserver and show the server URL.
5. Using a browser (for this example, on the same system) goto the URL that was shown to you as the output of ```node app.js```. For the example above it should be http://127.0.0.1:3000/.  When you open a URL in browser a get request it sent to the server and then it replies back with the message, which you see in the browser.


Congratulations on your first node.js app using **express**  package.

### The first MongoDB app
##### Installing MongoDB Server
In order to use MongoDB, we first need to have a MongoDB server. The easiest option (on Mac) is to download the [MongoDB app](http://gcollazo.github.io/mongodbapp/).

*Note: Thanks to [Giovanni Collazo](https://github.com/gcollazo) for the inspiration. [(app's src)](https://github.com/gcollazo/mongodbapp).*
Alternatively, you can also install it on Mac using homebrew Instruction are [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).*

*On other systems, you can install the community edition free from https://www.mongodb.com/download-center/community.*
*A cloud hosted solution e.g. [mLab] from MongoDB is another option. But it will require a few extra IT steps so I'll skip it for the moment.*

***All the below steps assume that you have installed and laucnhed the mongodb server.***

1. Create a directory for the app and chage to that. ```mkdir node_mongodb_app; cd node_mongodb_app```.
2. Create the node app package by running ```npm init```. It will ask you some question. You can hit just enter for each of them but to follow the convention make sure to provide a name for for the entry point as **app.js**. The node_mongodb_app will contain a **package.json** file now.
3. Install the _mongodb_ node package as dependency for the app by running ```npm install mongodb```. This will create **node_modules** subdirectory and **package-lock.json** file. It will also **modify package.json** to add a dependencies section.
4. Create a java script file in the directory. In the directory create a javascript file. ```touch app.js```
5. Open the file using whatever editor you prefer e.g. ```vi app.js``` and paste the below code in that file. This code is based upon W3School's guidee from [here](https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp)
```
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
```
6. Start the app (i.e. launch the webserver) on your system using ```node app.js```. It will launch the webserver and as per the example code will print whether the connection was established or no.

Congratulations on your first node.js app using **MongoDB**.
