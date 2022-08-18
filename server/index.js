const express = require('express')
const path = require('path')
//require('dotenv').config()


const app = express()

//   '9e7796c1b0914643bccb0be024f8ec9e'
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '9e7796c1b0914643bccb0be024f8ec9e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log("hello world jk")



app.use(express.json())
app.use(express.static('client'))

app.get('/',function(req,res) {
  rollbar.log("why isnt this working?")
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/css',function(req,res) {
    rollbar.log("they hit css")
    res.sendFile(path.join(__dirname, '../client/styles.css'));
  });

  
app.get('/js',function(req,res) {
    res.sendFile(path.join(__dirname, '../client/main.js'));
  });

  app.get('/rollb', (req, res) => {
    rollbar.log("they hit our website again")
    res.sendFile(path.join(__dirname, '../client/index.html'))
  })
  
//console.log(__dirname)
const port = process.env.PORT || 4005
// This will get the PORT variable from Heroku. However, if one isn't assigned (ex. when we are testing locally) it will use port 4005.

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})