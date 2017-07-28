const express = require('express');
let app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;//process is an object that stores 
//all our environment variables as key , value pairs
const ownModule = require('./public/ownModule');
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

//log middleware
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
  	if(err){
      console.log('Unable to append to server.log');
  	}
  });
  next();
});
//maintenance middleware
//app.use((req,res,next)=> {
 // res.render('maintenance.hbs');
//});
//static middleware
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()

});

hbs.registerHelper('setText',(text)=>{
  return text.toUpperCase()

});

app.get('/',(req,res) => {
  //res.send('<h1>Hello express..</h1>');
  //res.send({ "name":"Hari kumar","id":1254,"likes":[ 'learn','explore']});
  res.render('home.hbs',{
   pageTitle:'Home page',
   message:'Welcome to the Home page'
  });

});
app.get('/about',(req,res) => {
  
  res.send('about page..');

});
app.get('/contact',(req,res) => {
  
  res.render('contact.hbs',{
   pageTitle:'Contact page',
   message2:'Hello....'
  });

});
app.listen(port,()=>{
	console.log('server is running on port ${3000}');
});
console.log(ownModule.age);
console.log(ownModule.add(5,2));