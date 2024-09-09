const { S3Client, ListObjectsV2Command, DeleteObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const deleteImage = async (req, res) => {
    const { filename } = req.params;
    if (!filename || typeof filename !== 'string') {
        return res.status(400).json({ error: "Filename must be provided as a string." });
    }

    try {
        const deleteParams = {
            Bucket: "telefonclubb",
            Key: filename
        };

        const response = await s3.send(new DeleteObjectCommand(deleteParams));

        console.log(`Successfully deleted image: ${filename}`);
        res.status(200).json({ message: `Successfully deleted image: ${filename}` });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: `Failed to delete image: ${error.message}` });
    }
};

const bulkDeleteFunc = async (filenames) => {
    try {
        const deleteParams = {
            Bucket: "telefonclubb",
            Delete: {
                Objects: filenames.map(filename => ({ Key: filename })),
                Quiet: false
            }
        };
        const response = await s3.send(new DeleteObjectsCommand(deleteParams));

        const deletedKeys = response.Deleted.map(obj => obj.Key);
        console.log(`Successfully deleted images: ${deletedKeys.join(', ')}`);
        return `Successfully deleted images: ${deletedKeys.join(', ')}`;
    } catch (error) {
        console.error("Failed to delete images:", error);
        throw new Error(`Failed to delete images: ${error.message}`);
    }
};

const listAllImages = async (req, res) => {
    const bucketName = 'telefonclubb';
    try {
        const data = await s3.send(new ListObjectsV2Command({
            Bucket: bucketName,
        }));

        const imageKeys = data.Contents.map(item => item.Key);
        res.status(200).json({ img: imageKeys, message: 'Images successfully fetched' });
    } catch (error) {
        console.error("Error fetching images: ", error);
        res.status(500).json({ error: "Error fetching images" });
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'telefonclubb',
        key: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

module.exports = { upload, deleteImage, listAllImages, bulkDeleteFunc };
