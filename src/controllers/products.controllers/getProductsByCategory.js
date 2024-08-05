const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await prisma.category.findUnique({
            where: { id: Number(id) }
        }).Product();
        
        res.status(200).json(products);        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getProductsByCategory;