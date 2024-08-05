const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const getProductByIdSchema = z.object({
  id: z.number()
    .int({ message: 'Product ID must be an integer' })
    .min(1, { message: 'Product ID is required' })
});

const getProductById = async (req, res) => {
  const parseResult = getProductByIdSchema.parse({ id: Number(req.params.id) });
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }
  try {
    const { id } = parseResult.data;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductById;
