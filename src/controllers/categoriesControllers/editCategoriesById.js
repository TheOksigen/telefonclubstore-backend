const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const editCategoriesByIdSchema = z.object({
    id: z.number()
       .int({ message: 'Category ID must be an integer' })
       .min(1, { message: 'Category ID is required' }),
    categoryName: z.string()
       .min(3, { message: 'Category name must be at least 3 characters long' })
       .max(20, { message: 'Category name must be less than 255 characters' })
       .trim()
       .min(1, { message: 'Category name is required' })
})

const editCategoriesById = async (req, res) => {
    const parseResult = editCategoriesByIdSchema.safeParse(req.body);
    if (!parseResult.success) { return res.status(400).json({ errors: parseResult.error.format() }); }
    try {
        const { id } = req.params;
        const { categoryName } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { categoryName }
        });
        if (updatedCategory) { res.status(200).json(updatedCategory); }
        else { res.status(404).json({ error: "Category not found" }); }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = editCategoriesById ;

