const express = require('express');
const app = express();

app.use('/fretboard', express.static('fretboard3'))
app.use('/chords', express.static('chords'))

app.use('/', (req, res, next) => {
    res.send('<h1>Guitar Diagrams</h1>');   
});

module.exports = app; 