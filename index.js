const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

// Set Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Use morgan for logging HTTP requests
app.use(morgan('combined'));

// Custom middleware to log specific request data
app.use((req, res, next) => {
    const currentTime = new Date();
    console.log(`[${currentTime.toISOString()}] ${req.method} ${req.url}`);
    next(); 
});

// Route for the home page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

// Route for the about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Route for the contact page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.send('Your request has been received. Please check your email for nect steps');
});

// New route with a route parameter
app.get('/greet/:name', (req, res) => {
    const { name } = req.params; // Extract the name parameter
    res.render('greet', { title: 'Greeting Page', name });
});

// Route to handle file download
// Get the filename from the route parameter
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename; 
     // Construct the file path
    const fileLocation = path.join(__dirname, 'public/images', filename);
    res.download(fileLocation, filename, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
