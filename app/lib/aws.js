const AWS = require("aws-sdk");
const CONFIG = require("../config");

AWS.config.update({
  accessKeyId: CONFIG.AWS_ACCESS_KEY_ID,
  secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

function upload(buffer, name, mimetype) {
  const params = {
    Bucket: CONFIG.AWS_BUCKET,
    Body: buffer,
    Key: `${name}`,
    ACL: "public-read",
    contentType: mimetype
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  s3,
  upload
};
