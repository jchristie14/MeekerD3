var express = require('express');

var app = express();

app.use(express.static('lib'));
app.use(express.static('public'));

//set up hanlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.render('home');
});

app.get('/helloWorld', function(req, res){
	res.render('helloWorld');
});

app.get('/cities', function(req, res){
	res.render('cities');
});

app.get('/tweets', function(req, res){
	res.render('tweets');
});

app.get('/soccer', function(req, res){
	res.render('soccer');
});

app.get('/moneyandfriends', function(req, res){
	res.render('moneyandfriends');
});

app.get('/sitevisitors', function(req, res){
	res.render('sitevisitors');
});

app.get('/tweetinterpolation', function(req, res){
	res.render('tweetinterpolation');
});

app.get('/movies', function(req, res){
	res.render('movies');
});

//data routes
app.get('/cities.csv', function(req, res){
	res.send('../lib/cities.csv');
});

app.get('/tweets.json', function(req, res){
	res.send('../lib/tweets.json');
});

app.get('/worldcup.csv', function(req, res){
	res.send('../lib/worldcup.csv');
});

app.get('/boxplot.csv', function(req, res){
	res.send('../lib/boxplot.csv');
});

app.get('/tweetdata.csv', function(req, res){
	res.send('../lib/tweetdata.csv');
});

app.get('/movies.csv', function(req, res){
	res.send('../lib/movies.csv');
});


//custom 404 page
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});