require('dotenv').config()
var bodyParser = require('body-parser')

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeesRouter = require('./routes/api/employees')
const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', error => console.log(error));
db.on('open', () => console.log('connected to database'));

const port = process.env.NODE_PORT;

app.get('/', (req,res) => {
    return res.send('Health check, OK');
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/employees', employeesRouter);

app.listen(port, () => console.log('server has started'));