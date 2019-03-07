const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const { Documents } = require('./model.js')
const passport = require('passport')

const jsonParser = bodyParser.json()

router.use(jsonParser)

const jwtAuth = passport.authenticate('jwt', {session: false})

// get documents
router.get('/', (req, res) => {
  let promise
  if (req.query["searchTerm"]){
    console.log(req.query["searchTerm"])
    promise= Document.findByDocumentName(req.query["searchTerm"])
  }else{
    console.log('no searchTerm')
    promise = Documents.find()
  }
  promise
    .then((documents) => {
      res.json(documents.map(document => document.serialize()))
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'error getting documents' })
    })
});

router.get('/:id', (req,res) => {
  Documents
    .findById(req.params.id)
    .then(document => res.json(document.serialize()))
    .catch(er(err)> {
        console.error(err);
        res.status(500).json({ error: 'error finding by ID' });
      })
})

router.post('/', jwtAuth, (req, res) => {
  const requiredFields = ['documentName', 'documentURL'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(req.user.username)
  Document
  .create({
      documentName: req.body.documentName,
      notes: req.body.notes,
      healthProviderName: req.body.healthProviderName,
      address: req.body.address,
      phone: req.body.phone,
      documentURL: req.body.documentURL,
      userName: req.body.userName
    })
  .then(document => res.status(201).json(document.serialize()))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'error creating document' })
    })
  })

router.put('/:id', jwtAuth, (req, res) =>{
  if (!(req.params.id && req.body.id && (req.params.id === req.body.id))) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    })
  }
  const updated = {};
  const updateableFields = ['documentName', 'notes', 'healthProviderName', 'address', 'phone'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  })
  Document
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'error updating document' }))
})

router.delete('/:id', jwtAuth, (req, res) => {
    Documents
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error deleting document' });
      })
  })

module.exports = {router}
