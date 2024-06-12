const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// connecting to db
const notesFilePath = path.join(__dirname, '../db/db.json');

// Helper to read 
const readNotes = () => {
  return JSON.parse(fs.readFileSync(notesFilePath, 'utf8'));
};

// Helper function to write notes to file
const writeNotes = (notes) => {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};

// Get all notes
router.get('/', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Add new note
router.post('/', (req, res) => {
  const notes = readNotes();
  const newNote = { id: uuidv4(), title: req.body.title, text: req.body.text };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// Deleting note
router.delete('/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter(note => note.id !== req.params.id);
  writeNotes(notes);
  res.json({ success: true });
});

module.exports = router;
