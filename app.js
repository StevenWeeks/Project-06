const express = require('express')
const router = express.Router();
const data = require('./data.json')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// set route for static files like css and images
app.use('/static', express.static('public'))
// have the app use the pug view engine
app.set('view engine', 'pug');

// index aka homepage rendering
app.get('/', (req, res) => {
  res.render('index', { data })
});
// about me page route
app.get('/about', (req, res) => {
  res.render('about')
});

// dynamic project route creation, adds the id of a project to the end of the route for each project\
// renders each page with the project data based on the id
app.get('/project:id', (req, res) => {
  res.render('project', {
    data: data,
    id: req.params.id
  })
});

// when there's a 404 error, it sends it to the next function
app.use((req, res, next) => {
	const err = new Error('Sorry, no such page was found.')
	err.status = 404
	next(err)
});

// renders the error.pug to show a user friendly error message
app.use((err, req, res, next) => {
  res.locals.error = err
  res.render('error')

})

// makes the site appear on localhost:3000
app.listen(3000, () => {
})
