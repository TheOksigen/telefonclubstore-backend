const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const querySchema = z.object({
  name: z.string()
    .min(3, { message: 'Product name must be at least 3 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
})

const searchProduct = async (req, res) => {
  try {
    querySchema.parse(req.query)
    const { name } = req.query;
    const filter = name ? {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    } : {};

    const products = await prisma.product.findMany({
      where: filter,
      include: { category: true }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = searchProduct;
