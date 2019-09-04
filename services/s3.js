require('dotenv').config();
const fs = require('fs');
const aws = require('aws-sdk');
const { randomString } = require('../helpers');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  apiVersion: '2006-03-01',
});

const fakeUpload = async () => ({
  Location: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${+(new Date())}_${randomString()}.jpg`,
});

const upload = async (path) => {
  if (process.env.NODE_ENV === 'testing') return await fakeUpload();
  const fileStream = fs.createReadStream(path);
  const extention = path.split('.').pop();
  const uploadPromise = new Promise((resolve, reject) => {
    s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: `${+(new Date())}_${randomString()}.${extention}`,
      Body: fileStream,
      ACL: 'public-read',
    }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  return await uploadPromise;
};

module.exports = {
  upload,
};
