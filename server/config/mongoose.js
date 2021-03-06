var mongoose    = require('mongoose'),
    path        = require('path'),
    fs          = require('fs'),
    models_path = path.join(__dirname + './../models'),
    dbURI       = 'mongodb://localhost/survey1';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(`Mongoose default connection open to ${ dbURI }`)
})

mongoose.connection.on('error', function (err) {
  console.error(`Mongoose default connection error: ${ err }`)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js')>=0){
    require(models_path + '/' + file);
  }
})
