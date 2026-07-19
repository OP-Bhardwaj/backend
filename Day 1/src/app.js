const express = require("express")
const note = require("./models/note.model");

const app = express()

app.use(express.json())

const notes = []

app.post('/notes', async (req, res) => {
  const data = req.body
  await noteModel.create({
    title: data.title,
    description: data.description
  })

  res.status(200).json({
    message: "note created successfully"
  })

})

//  GET METHOD to get data from server----------
app.get('/notes', (req, res) => {

  res.status(200).json({
    message: "notes fetched successfully",
    notes: notes
  })
})

// DELETE METHOD to delete anything----------------------------

app.delete('/notes/:index', (req, res) => {

  const index = req.params.index

  delete notes[index]

  res.status(200).json({
    message: "note deleted successfully"
  })
})

// PATCH METHOD to update anything -----------------------------------------

app.patch('/notes/:index', (req, res) => {

  const index = req.params.index
  const description = req.body.description
  const title = req.body.title

  notes[index].description = description
  notes[index].title = title

  res.status(200).json({
    message: "notes updated successfully"
  })
})
 



module.exports = app;

