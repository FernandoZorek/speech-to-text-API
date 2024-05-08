const fs = require('fs');

class AudioParser {    
  async start(filePath) {
    const speech = require('@google-cloud/speech');
    const speechClient = new speech.SpeechClient();

    async function transcribeAudioFile(filePath) {

      const audioBuffer = fs.readFileSync(filePath);
      const audio = {
        content: audioBuffer
      };

      const config = {
        languageCode: process.env.LANGUAGE_CODE,
        model: 'default', 
        sampleRateHertz: 44100,
        audioEncoding: 'LINEAR16'
      };

      const request = {
        audio: audio,
        config: config,
      };

      const [response] = await speechClient.recognize(request);
      const transcription = response.results[0].alternatives[0].transcript;
      if (!transcription) {
        console.log(response)
        throw new Error('Error in generating transcript...')
      }
      return { record: transcription };

    }

    return await transcribeAudioFile(filePath)
      
  }

}

module.exports = AudioParser;