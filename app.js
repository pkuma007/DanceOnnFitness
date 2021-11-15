const express = require('express');
const app = express();
const path = require('path');

// enable static files pointing to the folder "public"
// this can be used to serve the index.html file
app.use(express.static(path.join(__dirname, "views")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
// end parser middleware

// custom middleware to log data access
const log = function (request, response, next) {
	console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
	console.log(request.body); // make sure JSON middleware is loaded first
	next();
}
app.use(log);
// end custom middleware

app.set('views', './views')
app.set('view engine', 'ejs');


//Default Page
app.get('/',function(req,res){
  res.render('index', {
    subject: 'Dance-ONN Fitness House',
    page: 'index',
    pageTitle:'Home'
  });
});
//Home Page
app.get('/home', (request, response) => {
  response.render('index', {
    subject: 'Dance-ONN Fitness House',
    page: 'index',
    pageTitle:'Home'
  });
});

app.get('/about',function(req,res){
  res.render('index', {
    subject: 'Dance-ONN Fitness House',
    page: 'about-us',
    pageTitle:'About Us'
  });
});

app.get('/contact',function(req,res){
  res.render('index', {
    subject: 'Dance-ONN Fitness House',
    page: 'contact',
    pageTitle:'Contact Us'
  });
});

app.get('/enquiry',function(req,res){
  res.render('partials/enquiry', {
    subject: 'Dance-ONN Fitness House',
    page: 'enquiry',
    pageTitle:'Contact Us'
  });
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

// HTTP POST
app.post("/ajax/email", function(req, res) { // this will be used to send the emails
	res.json( { message: "You attempted to send a message but this is not implemented yet." } );
});

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
  //res.send("/views/404.html", {name:'HelloPK'});
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  //res.send('what???', 404);
  res.render('index', {
    subject: 'Dance-ONN Fitness House',
    page: 'pageNotFound',
    pageTitle: 'pageNotFound'
  });
  //console.log("Page not Found")
});


app.listen(3000, () => {
  console.log('App is listening on port 3000');
});