## Snips based Voice Assistant
[Snips](https://snips.ai) voice platform is an on-device voice engine that helps create a voice assistant.

### The first AI App: A Voice Assitant
In order to create the voice assistance feature on the device, we need two pieces; The snips voice engine and the trained algorithm. [Snips](https://snips.ai) voice platform is an on-device voice engine that helps create a voice assistant. It has three components;
- Wake Word Detector
- Automatic Speech Recognition Engine: _converts voice to text_
- NLU Engine ([github source](https://github.com/snipsco/snips-nlu)) extracts structured data from the text.

Creating an assistant means defining the use cases that  you want the assistant to handle. They are called ***intents***. For each intent, you provide examples to train the Speech Recognition (ASR) and Natural Language Understanding (NLU) algorithms.
_"You can then code the logic of your assistant in the Console directly, in a Github repo, point to an existing Home Assistant component, or manually set up your bindings. You are then ready to deploy a fully functional voice assistant!"_

#### Creating voice assistant algorithm
In order to use snips on a device, you first need to create it's assistant model and train it on [Snips Web Console](console.anips.ai). The outcome of that is the training data, which is downloaded to the device. Steps (outlined from snips' [Console QuickStart guide](https://docs.snips.ai/getting-started/quick-start-console)) are

1. Goto [Snips Console](https://console.snips.ai/home/assistants).  (_Create your account as needed_)
2. Create an Assistant by clicking "Create New"
3. Create app in the assistant. (_app is same as an application that will be used on the device_)
4. Create intents in apps (intent are synonomous with ***intentions*** i.e. what are the things that application will do). An application can have one or more intents.
5. Create slots for the intent i.e. define the key parts to be extracted from a natural language text representing the intent. Each slot will have a name and a data type attribute.
  ***Note***: Three types of slots namely **```default```** , **```built-in```** and **```custom```** can be handled by Snips. ([Reference](https://docs.snips.ai/articles/platform/dialog/slot-types))
  - **default** is type of a new slot when no other type is defined. _As per my understanding its not even possible to have it practically. It's more like internal to snips_
  - **built-in** means a pretrained detection algorithm is already available and will be used. Numeric, Time/Duration and Music entities are part of Built-in slot types. ([See more](https://docs.snips.ai/articles/platform/dialog/slot-types#built-in-slot-type))
  - **custom** means you create it manually by specifying all the values. It's like creating a collection/enum data type. ([See More](https://docs.snips.ai/articles/platform/dialog/slot-types#custom-slot-type)). _I think this should be the most popular one_
6. Train the assistant by providing natural language text example and then manually marking the slots in them. Snips Console is clearn enough for that.
7. Save the intent, which will start training the algorithms. Test the trained algorithm with a couple of exmaple and see how the output will look like in JSON
8. Download the trained model using "Deply Assistant". You'll get a zip file containing a bunch of config and binary files.

#### Installing Snips on Device (MacOS)
In order to use Snips on device, we first need to install its library/ies. Follow the below steps to do it on Mac.
Rest of the steps are on the device.

1. Add Homebrew tap (source) for snips
```
brew tap snipsco/homebrew-snips
```
2. Install snips components
```
brew install snips-asr snips-hotword snips-dialogue snips-watch snips-audio-server snips-nlu snips-tts
```
3. Install [MQTT](http://mqtt.org) protocol client. It's named [mosquitto](https://formulae.brew.sh/formula/mosquitto) and it's code is at github [here](https://github.com/Homebrew/homebrew-core/blob/master/Formula/mosquitto.rb).
```
brew install mosquitto
```
4. Create start and stop scripts for [MQTT](http://mqtt.org) and snips related services
  - snips-start.sh should look like below
  ```
  brew services start mosquitto
  brew services start snips-audio-server
  brew services start snips-hotword
  brew services start snips-tts
  brew services start snips-nlu
  brew services start snips-asr
  brew services start snips-dialogue
  ```

  - snips-staop.sh should look like below
  ```
  brew services stop snips-dialogue
  brew services stop snips-asr
  brew services stop snips-nlu
  brew services stop snips-tts
  brew services stop snips-hotword
  brew services stop snips-audio-server
  brew services stop mosquitto
  ```
5. Also unzip the downloaded assistant zip file to an appropriate location
```
cd /usr/local/share/snips/assistant/
unzip ~/Downloads/assistant_<xyz>.zip
```

#### Creating the node.js app for voice assistant
1. Create a directory for the app and chage to that. ```mkdir node_snips_voice_ai_app; cd node_snips_voice_ai_app```.
2. Create the node app package by running ```npm init```. It will ask you some question. You can hit just enter for each of them but to follow the convention make sure to provide a name for for the entry point as **app.js**. The node_mongodb_app will contain a **package.json** file now.
3. Install the mqtt node package as dependency for the app by running ```npm install mqtt```. This will create **node_modules** subdirectory and **package-lock.json** file. It will also **modify package.json** to add a dependencies section.
4. Create a java script file in the directory. In the directory create a javascript file. ```touch app.js```
5. Open the file using whatever editor you prefer e.g. ```vi app.js``` and paste the below code in that file. This code is based upon snips' guide from [here](https://docs.snips.ai/getting-started/quick-start-macos). This code is launching an MQTT server that starts listening for events. When a client connects, it subscribes to listen to all intents. This is what **#** refers to in **hermes/#**. You can specify an intent name here to listen to a particular intent. [Hermes](https://docs.snips.ai/reference/hermes) ([github source](https://github.com/snipsco/hermes-protocol)) is an MQTT based protocol used by Snips for communication among its components. (Note: Besides MQTT, Hermes has implementation based upon other messaging system as well)

```
var mqtt = require('mqtt');

var hostname = "mqtt://localhost:1883";
var client  = mqtt.connect(hostname);

client.on('connect', function () {
    console.log("[Snips Log] Connected to MQTT broker " + hostname);
    client.subscribe('hermes/#');
});

client.on('message', function (topic, message) {
    if (topic === "hermes/asr/startListening") {
        onListeningStateChanged(true);
    } else if (topic === "hermes/asr/stopListening") {
        onListeningStateChanged(false);
    } else if (topic.match(/hermes\/hotword\/.+\/detected/g) !== null) {
        onHotwordDetected()
    } else if (topic.match(/hermes\/intent\/.+/g) !== null) {
        onIntentDetected(JSON.parse(message));
    }
});

function onIntentDetected(intent) {
    console.log("[Snips Log] Intent detected: " + JSON.stringify(intent));
}

function onHotwordDetected() {
    console.log("[Snips Log] Hotword detected");
}

function onListeningStateChanged(listening) {
    console.log("[Snips Log] " + (listening ? "Start" : "Stop") + " listening");
}
```
6. Start the snips and mqtt services by running ```start-snips.sh```, the script that you created above during MacOS setup
7.
Start the app (i.e. launch the webserver) on your system using ```node app.js```. It will connect to the MQTT server and show on the console. Test it by saying "Hey snips" and you should see the messages getting printed on console.

8. stop your app and then stop the snips and mqtt services by running ```stop-snips.sh```.

Congratulations on your first node.js app **AI voice assistant**.
