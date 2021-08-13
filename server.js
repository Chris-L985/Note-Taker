// Required NPM packages
const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// Notes directory
const { notes } = require("./Develop/db/db.json");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// path to the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// path to the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
    const makeNote = req.body;
    notes.push(makeNote);
    fs.writeFileSync(
        path.join(__dirname, "./Develop/db/db.json"),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(makeNote);
});


app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}`);
});