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

// Bulk delete images function
const bulkDeleteImages = async (req, res) => {
    const { filenames } = req.body;
    try {
        const result = await bulkDeleteFunc(filenames);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error("Error deleting images:", error);
        res.status(500).json({ error: `Failed to delete images: ${error.message}` });
    }
};

const bulkDeleteFunc = async (filenames) => {
    console.log(filenames);

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
        console.log(`Successfully deleted images: ${deletedKeys.join(', ')}`)
        return `Successfully deleted images: ${deletedKeys.join(', ')}`;
    } catch (error) {
        console.error("Error deleting images:", error);
        throw new Error("Failed to delete images");
    }
};

const listAllImages = async (req, res) => {
    const bucketName = 'telefonclubb';
    try {
        const data = await s3.send(new ListObjectsV2Command({
            Bucket: bucketName,
        }));

        const imageKeys = data.Contents.map(item => item.Key);
        res.status(200).json({ img: imageKeys, message: 'Images successfully deleted' });
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

module.exports = { upload, bulkDeleteImages, listAllImages, bulkDeleteFunc };
