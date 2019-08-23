  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./router/router');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB is Connected!"))
    .catch(err => console.log(err));
app.use('/', Router);

app.listen(port, () => console.log(`listening on port ${port}.`));