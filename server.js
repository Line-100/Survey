// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const uri = "your_connection_string_here"; // Replace with your MongoDB connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Survey Schema
const surveySchema = new mongoose.Schema({
    question: String,
    answer: String
});
const Survey = mongoose.model('Survey', surveySchema);

// API Endpoint to Submit Survey
app.post('/submit-survey', (req, res) => {
    const newSurvey = new Survey({
        question: req.body.question,
        answer: req.body.answer
    });

    newSurvey.save()
        .then(() => res.status(201).send('Survey submitted successfully!'))
        .catch(err => res.status(400).send(err));
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
