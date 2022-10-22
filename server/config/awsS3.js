const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = process.env.AWS_S3_BUCKET_REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  credentials: { accessKeyId, secretAccessKey },
  region,
});

const uploadFile =  (fileBuffer, fileName, type) => {
  return s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Body: fileBuffer,
      Key: `${type}/${fileName}`,
      ContentType: type,
    })
  );
};

module.exports = { uploadFile };
