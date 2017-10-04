const NOTES = {
  notes: '/notes',
  notesById: '/notes/:id',
  errorMassage: 'An error has occurred',
  collection: 'notes',
  isEmpty: 'No data for this ID!',
}

const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {

  app.post(NOTES.notes, (req, res) => {
    const note = {
      text: req.body.body,
      title: req.body.title,
    }
    db.collection(NOTES.collection).insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': NOTES.errorMassage })
      } else {
        res.send(result.ops[0])
      }
    })
  })

  app.get(NOTES.notesById, (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    db.collection(NOTES.collection).findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': NOTES.errorMassage })
      } else if (item === null) {
        res.send(NOTES.isEmpty)
      } else {
        res.send(item)
      }
    })
  })

  app.put(NOTES.notesById, (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    const note = {
      text: req.body.body,
      title: req.body.title,
    }
    db.collection(NOTES.collection).update(details, note, (err) => {
      if (err) {
        res.send(NOTES.errorMassage)
      } else {
        res.send(note)
      }
    })
  })

  app.delete(NOTES.notesById, (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    db.collection(NOTES.collection).remove(details, (err) => {
      if (err) {
        res.send({ 'error': NOTES.errorMassage })
      } else {
        res.send('Note ' + id + ' deleted!')
      }
    })
  })
}
