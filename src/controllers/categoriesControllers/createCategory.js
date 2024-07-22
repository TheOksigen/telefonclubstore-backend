const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const categorySchema = z.object({
    categoryName: z.string()
        .min(3, { message: 'Category name must be at least 3 characters long' })
        .max(20, { message: 'Category name must be less than 255 characters' })
        .trim()
        .min(1, { message: 'Category name is required' })
});

const createCategory = async (req, res) => {
    const parseResult = categorySchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }
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
