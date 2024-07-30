const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getCategoriesById = async (req, res) => {    
    try {
        const { id } = req.params;
        const categories = await prisma.category.findMany({
            where: { id: Number(id) },
            include: {
                Subcategory: {
                    select: {
                        id: true,
                        categoryName: true
                    }
                }
            }
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getCategoriesById;