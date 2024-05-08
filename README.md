# Speech-to-Text API with Folder Monitoring
## _speech-to-text-API_

> This project implements a speech-to-text
> system using the Google Cloud Speech-to-Text API
> and folder monitoring with the Chokidar library.
> The system monitors the "files" folder for MP3 files,
> converts the audio content to text, and saves the
> result to the MongoDB database. After conversion,
> the MP3 file is moved to the "files-processed" folder.

## Features

- Folder Monitoring:
 - The Chokidar library is used to monitor the "files" folder for new additions.
 - When a new MP3 file is detected, the system triggers an event.

- Speech-to-Text Conversion:
 - The Google Cloud Speech-to-Text API is used to convert the content of the MP3 file to text.
 - The converted text is stored in a variable.

- Database Storage:
 - The converted text and relevant information from the MP3 file (name, creation date, etc.) are saved to the MongoDB database.

- Move File to Processed Folder:
 - After conversion and storage, the original MP3 file is moved to the "files-processed" folder.

## Tech

This project uses several open source projects to function correctly::

- [Docker] - Platform for developing, shipping, and running applications using containerization;
- [Node.js] - JavaScript runtime built on Chrome’s V8 JavaScript engine;
- [google-cloud/speech] - Turn text into natural-sounding speech in 220+ voices across 40+ languages and variants with an API powered by Google's machine learning technology;
- [fs-js] - A native module for effectively working with files built on top of Node's famous fs module;
- [Chokidar] - Chokidar does still rely on the Node.js core fs module, but when using fs.watch and fs.watchFile for watching, it normalizes the events it receives, often checking for truth by getting file stats and/or dir contents;
- [MongoDB] - MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB utilizes JSON-like documents with optional schemas;

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```bash
yarn
```
### Configure environment variables:

```sh
Replace DB_URL, DB_NAME, DB_COLLECTION, DB_ROOT_USERNAME and DB_ROOT_PASSWORD with your database connection details in docker-compose file.
```

### Configure key.json:

```sh
Access your Google Cloud account, generate your key.json file and place it in the root of the project.
```

### Provide the MP3 file path:

```sh
Replace files/example.mp3 with the actual MP3 file path in index.js.
```

### Start the app

```bash
docker-compose up
```

## License

MIT
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
[Docker]: <https://docs.docker.com/>
[Openai]: <https://openai.com/api>
[Node.js]: <https://nodejs.org/docs/latest/api/>
[fs-js]: <https://www.npmjs.com/package/fs-js>
[google-cloud/speech]: <https://www.npmjs.com/package/@google-cloud/speech>
[Chokidar]: <https://www.npmjs.com/package/chokidar>
[MongoDB]: <https://www.mongodb.com/>

