const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();


const subcategorySchema = z.object({
    categoryName: z.string()
        .min(3, { message: 'Subcategory name must be at least 3 characters long' })
        .max(20, { message: 'Subcategory name must be less than 255 characters' })
        .trim()
        .min(1, { message: 'Subcategory name is required' }),
    categoryId: z.number()
        .int({ message: 'Category ID must be an integer' })
        .min(1, { message: 'Category ID is required' })
        .max(3, { message: 'Category ID must be ' })
})

const createSubcategory = async (req, res) => {
    const parseResult = subcategorySchema.safeParse(req.body);
    if (!parseResult.success) { return res.status(400).json({ errors: parseResult.error.format() }); }

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