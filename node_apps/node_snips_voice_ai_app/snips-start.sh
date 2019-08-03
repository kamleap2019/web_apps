# Start MQTT Protocol Server
brew services start mosquitto

# Audio service for using Audio HW on the device
brew services start snips-audio-server

# Service to detect the wake word like hey snips
brew services start snips-hotword

# Service that converts voice to text (ASR = Automatic Speed Recognition)
brew services start snips-asr

# Service that extracts structured data from queries expresses in natural language
brew services start snips-nlu

# Text to Speech service (Not used in the demo app)
brew services start snips-tts

brew services start snips-dialogue
