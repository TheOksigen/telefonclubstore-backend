const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSubcategory = async (req, res) => {
       try {
        const { categoryName, categoryId } = req.body;
        const subcategory = await prisma.subcategory.create({
            data: {
                categoryName,
                categoryId: Number(categoryId)
            }
        });
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createSubcategory;