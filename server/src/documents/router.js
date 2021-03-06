// import {connect} from 'react-redux';

const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const { Document } = require('./model.js')
const passport = require('passport')

const jsonParser = bodyParser.json()

router.use(jsonParser)

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const jwtAuth = passport.authenticate('jwt', {session: false})

const upload = require('../aws/multer');
const singleUpload = upload.single('documentFile');


// get documents
router.get('/', (req, res) => {
  let promise
  if (req.query["searchTerm"]){
    console.log(req.query["searchTerm"])
    promise= Document.findByDocumentName(req.query["searchTerm"])
  }else{
    console.log('no searchTerm')
    promise = Document.find()
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
  Document
    .findById(req.params.id)
    .then(document => res.json(document.serialize()))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'error finding by ID' });
      })
})
// router.get('/image/:imageID', (req,res) =>{
//   console.log('imageID: ' + req.params.imageID)
// })

router.post('/', (req, res) => {
  const requiredFields = ['documentName'];
  console.log("POST DOC", req.body)
  singleUpload(req, res, function(err, some) {
    console.log('FILE UPLOADED.')
    if (err){
      return res.status(422).send({errors: [{title: 'Document File Upload Error', detail: err.message}]})
    }
    Document
    .create({
        documentName: req.body.documentName,
        notes: req.body.notes,
        healthProviderName: req.body.healthProviderName,
        // address: req.body.address,
        // phone: req.body.phone,
        documentURL: req.file.location,
        userName: req.body.username
      })
    .then(document => res.status(201).json(document.serialize()))
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: 'error creating document' })
    })
  })
})
  // for (let i = 0; i < requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`;
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }


router.put('/:id', (req, res) =>{
  // if (!(req.params.id && req.body.id && (req.params.id === req.body.id))) {
  //   res.status(400).json({
  //     error: 'Request path id and request body id values must match'
  //   })
  // }
  const updated = {};
  console.log("POST DOC", req.body)
  const updateableFields = ['documentName', 'notes', 'healthProviderName', 'address', 'phone'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  })
  singleUpload(req, res, function(err, some) {
    console.log('FILE UPLOADED.')
    if (err){
      return res.status(422).send({errors: [{title: 'Document File Upload Error', detail: err.message}]})
    }
    Document
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'error updating document' }))
  })
})

router.delete('/:id', (req, res) => {
    Document
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error deleting document' });
      })
})
  
// const mapStateToProps = state => ({
//   authToken: state.auth.authToken,
//   currentUser: state.auth.currentUser
// });

// export default withRouter(connect(mapStateToProps)(App));

module.exports = {router}
