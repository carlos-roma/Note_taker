const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // 

// Parsing JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Home endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
