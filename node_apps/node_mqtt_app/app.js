
var mqtt = require('mqtt')
var mqtt = require('mqtt')

var options={
    clientId:'localhost',
    clean: 'true'
};

var client  = mqtt.connect('mqtt://127.0.0.1', options)

var MQTT_TOPIC = 'greetings'

client.on('connect', function () {
    console.log("Connected")

    client.subscribe(MQTT_TOPIC, function (err) {
        if (!err) {
            console.log("Subscribed to a topic")
        }
    })

    client.publish(MQTT_TOPIC, "Humans Learn!")
})

client.on('message', function (topic, message, packet) {
    console.log("got this message:  " + message.toString())
    client.end()
})

// Handling of all of the below events is optional i.e. depends upon what you want to do
client.on('packetsend', function(packet){
    console.log ("Packet Sent = ", packet.toString())
})

client.on('packetreceive', function(packet){
    console.log ("Packet Received = ", packet.toString())
})

client.on('disconnect', function(packet){
    console.log("Got disconnect = ", packet )
})

client.on('error', function(){
    console.log("Error. Is MQTT broker running")
    client.end()
})

client.on('close', function(){
    console.log("closing")
})

client.on('offline', () => {
    console.log("MQTT offline")
    client.end()
})