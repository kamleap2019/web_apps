
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
