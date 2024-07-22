const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const deleteCategoryByIdSchema = z.object({
  id: z.number()
    .int({ message: 'Category ID must be an integer' })
    .min(1, { message: 'Category ID is required' })
})

const deleteProductById = async (req, res) => {
  const parseResult = deleteCategoryByIdSchema.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }
  try {
    const { id } = req.params;
    await prisma.product.delete({
      include: { category: true },
      where: { id: Number(id) },

    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductById;
