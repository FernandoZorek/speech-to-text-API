
const DatabaseManager = require('./bd/mongodb/databaseManager');
const AudioParser = require('./audioParser'); 
const fs = require('fs')
const fsPromises = require('fs/promises')
const chokidar = require('chokidar')


module.exports = (async () => { 

  console.log('Searching for files *.mp3...')

  const sendToQueue = async (fileBuffer, filename) => {

    const audioFilePath = './' + filename;
    console.log('Find file: ', audioFilePath)

    const audioParser = new AudioParser();
    const normalizedData = await audioParser.start(audioFilePath);

    const databaseManager = new DatabaseManager();
    await databaseManager.save(normalizedData);

    const file = audioFilePath.split('/').pop();
    const moveFile = fsPromises.rename;
    await moveFile(audioFilePath, './files-processed/' + file);
  
  }

  const PATH_FILES = './files'

  const filterFileListByExtension = (files, extension) => {
    const { extname, basename } = require('path')
    return files.filter(f => extname(basename(f)) === extension)
  }

  const watchedFolder = chokidar.watch(PATH_FILES, {
    ignoreInitial: false,
    ignored: '*.old'
  })

  watchedFolder.on('ready', () => console.log(`Waiting for files in volume ${PATH_FILES}`))

  watchedFolder.on('add', (path) => {
    if (filterFileListByExtension([path], '.mp3').length > 0) {
      return sendToQueue(fs.readFileSync(path), path)
    }
  })

  watchedFolder.on('error', (error) => {
    console.log(error)
    throw new Error('watched Folder Error')
  })

})