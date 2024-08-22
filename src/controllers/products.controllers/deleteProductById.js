const { bulkDeleteFunc } = require("../../middlewares/upload.middleware")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.findUnique({
            where: { id }
        })
        console.log(product)
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        await bulkDeleteFunc(product.img)
        const deletedProduct = await prisma.product.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteProductById;
