const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  acessKeyId: process.env.AWS_ACCESS_ID,
  region: 'us-east-2'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'chronicdata-records',
    acl: 'bucket-owner-full-control',
    metadata: function(req, file, callback){
      callback(null, Date,now().toString())
    }
  })
})

module.exports = upload;