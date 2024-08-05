const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const deleteCategoryByIdSchema = z.object({
    id: z.number()
        .int({ message: 'Product ID must be an integer' })
        .min(1, { message: 'Product ID is required' })
});

const deleteProductById = async (req, res) => {
    const params = { id: Number(req.params.id) };

    const parseResult = deleteCategoryByIdSchema.parse(params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }
    try {
        const { id } = params;
        await prisma.product.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteProductById;
