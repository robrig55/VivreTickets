const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const _ = require('lodash')

require("dotenv").config({ path: './config.env' })

// routes
const users = require('./apis/users')
const events = require('./apis/events')
const activity = require('./apis/activity')
const content = require('./apis/content')

const app = express();

// Connect Database
connectDB();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}))

// enable to access upload folder anywhere
app.use('/api', express.static('uploads'))
// app.use("/styles", express.static(__dirname + '/styles'));
// cors
app.use(cors())

// other middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello world!'));
app.get('/api', (req, res) => res.send('This is API Router'))

// use Routes
app.use('/api/users', users)
app.use('/api/events', events)
app.use('/api/activities', activity)
app.use('/api/content', content)

const port = process.env.PORT || 8080;

app.listen(
    port, 
    '0.0.0.0', 
    () => console.log(`Server running on port ${port}`)
)