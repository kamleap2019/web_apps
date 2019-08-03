### The first IOT App
MQTT is a simple publish / subscribe protocol that allows to send messages on a topic (aka channel) with the help of a cental message broker/server.

##### Installing MQTT server
In order to use MQTT, we first need to have a MQTT server (Message Broker). There are some [public hosted test MQTT brokers](https://github.com/mqtt/mqtt.github.io/wiki/public_brokers) and many paid solutions like Windows Azure IoT etc. but for our demo app the simplest option is to install one on your system. [Mosquitto](https://mosquitto.org/) is the easiest option for that. On mac you can install it via brew like
```
brew install mosquitto
```
1. Create a directory for the app and chage to that. ```mkdir node_mqtt_app; cd node_mqtt_app```.
2. Create the node app package by running ```npm init```. It will ask you some question. You can hit just enter for each of them but to follow the convention make sure to provide a name for for the entry point as **app.js**. The node_mqtt_app will contain a **package.json** file now.
3. Install the _mqtt_ node package as dependency for the app by running ```npm install mqtt```. This will create **node_modules** subdirectory and **package-lock.json** file. It will also **modify package.json** to add a dependencies section.
4. Create a java script file in the directory. ```touch app.js```
5. Open the file using whatever editor you prefer e.g. ```vi app.js``` and paste the below code in that file. This code is based upon NMPJS's guide from [here](https://www.npmjs.com/package/mqtt). It  connects to the MQTT server running on localhost, subscribes to a topic ```geetings```, publishes a message on that topic and when the message is received, it prints that message on console.

```
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
    console.log("Connected")

    // Subscribe to a topic
    client.subscribe('greetings', function (err) {
        if (!err) {
            console.log("Subscribed to a topic")
        }
    })

    client.publish('greetings', "Humans Learn!")
})

client.on('message', function (topic, message) {
    console.log("got this message")
    console.log(message.toString())
    client.end()
})
```
6. Start the app on your system using ```node app.js```. As per the example code will print whether the connection was established or no.

Congratulations on your first node.js app using **MongoDB**.

Note: [mosca](http://www.mosca.io/) is a standalone MQTT broker for node.js which can be used in place of mosquitto server and mqtt node module. It however uses