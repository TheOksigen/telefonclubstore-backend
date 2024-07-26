const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {    
    try {
        const { categoryName } = req.body;
        const category = await prisma.category.create({
            data: { categoryName }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createCategory;
