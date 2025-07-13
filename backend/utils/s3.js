const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const REGION = process.env.AWS_REGION || 'ap-southeast-1';
const BUCKET = process.env.S3_BUCKET;
const KMS_KEY_ID = process.env.KMS_KEY_ID;

const s3Client = new S3Client({ region: REGION });

async function getUploadUrl(token, filename) {
    const key = `uploads/${token}/${Date.now()}_${filename}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: 'application/octet-stream',
        ServerSideEncryption: 'aws:kms',
        SSEKMSKeyId: KMS_KEY_ID,
    })

    return getSignedUrl(s3Client, command, {expiresIn: 300 })
}

async function getDownloadUrl(fileKey) {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: fileKey,
    });
    console.log('Generating download URL for file:', fileKey);
    return getSignedUrl(s3Client, command, { expiresIn: 60 });
}

module.exports = { getUploadUrl, getDownloadUrl };