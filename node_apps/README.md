#Introduction
This repo/folder contains basic node based web apps. Refernce apps will be kept in separate branches here.

##[Node.js](https://nodejs.org/en/) Apps
Node.js allows us to write server-side javascript based applications with async event handling using Chrome's V8 [(src)])(https://github.com/v8/v8) JavaScript engine.

###JavaScript App properties
+ JavaScript apps are single threaded. The JavaScript app can have only one thread of execution
+ JavaScript runs in a Browser on client side
+ The Browser's JavaScript engine (i.e. the client) interprets the code side.

All of the above JavaScript execution model limitations are worked out by Node by providing a runtime and thus allowing to right apps on the server side with concurrent event handling.

### [Express](https://expressjs.com/) Framework for Node apps
Express[(src)](https://github.com/expressjs/express) minimalist framework to write node apps. This is the most popular Node web framework and a lot of other packages are built on top of this. It's not part of Node but is almost considered like that.

### [NPM](https://www.npmjs.com/) _Node Package Manager_
npm [(src)](https://github.com/npm/cli) The tool for managing node modules. ```npm install``` is a command that is needed often.

### [Yarn](https://yarnpkg.com/en/)
yarn [(src)](https://github.com/yarnpkg/yarn/) The dependency management tools for node. It's similar to npm.
