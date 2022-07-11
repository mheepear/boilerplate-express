let express = require('express');
let app = express();
let bodyParser = require('body-parser');

//Implement a Root-Level Request Logger Middleware
app.use((req,res,next) => {
  console.log(req.method + " " + req.path + " - " + req.ip );
  next();
})

//Serve static assets
app.use('/public', express.static(__dirname + "/public"));

//serve html file
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html"); 
})

//serve json data and use env variable to check
app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE === 'uppercase') {
  res.json({message: "Hello json".toUpperCase()});  
  } 
  else {res.json({message: "Hello json"});
}
})

//Chain Middleware to Create a Time Server
app.get('/now', (req,res,next) => {
  req.time = new Date().toString();
  next();
  }, (req,res) => {
    res.send({time: req.time});
  });

//Get Route Parameter Input from the Client
app.get('/:word/echo', (req,res) => {
  let {word} = req.params;
  res.send({echo:word})
})

//Get Query Parameter Input from the Client
app.get('/name', (req,res) => {
  let {first, last} = req.query;
  res.send({name: `${first} ${last}`
           });
})


//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false}));

//Get Data from POST Requests
app.post('/name', bodyParser.json(),(req,res) => {
  var stringName = req.body.first + " " + req.body.last;
  res.json({ name: stringName });
})



































 module.exports = app;
